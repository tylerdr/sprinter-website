import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

/**
 * Handle successful checkout session completion
 */
export async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = await createClient();

  try {
    // Extract customer email and metadata
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerId = session.customer as string;
    const metadata = session.metadata || {};

    if (!customerEmail) {
      console.error('No customer email found in session');
      return;
    }

    // Update or create lead record
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .upsert({
        email: customerEmail,
        full_name: session.customer_details?.name || metadata.name,
        company: metadata.company,
        role: metadata.role,
        phone: session.customer_details?.phone || metadata.phone,
        source: metadata.source || 'workshop',
        status: 'contacted',
        stripe_customer_id: customerId,
        contacted_at: new Date().toISOString(),
        metadata: {
          checkout_session_id: session.id,
          payment_intent: session.payment_intent,
          amount_total: session.amount_total,
          currency: session.currency,
        }
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error updating lead:', leadError);
      return;
    }

    // If this was a workshop registration, create workshop record
    if (metadata.workshop_date) {
      const { error: workshopError } = await supabase
        .from('workshop_registrations')
        .insert({
          lead_id: lead.id,
          workshop_date: metadata.workshop_date,
          workshop_time: metadata.workshop_time,
          workshop_type: metadata.workshop_type || '90-minute',
          topics: metadata.topics ? metadata.topics.split(',') : [],
          company_size: metadata.company_size,
          current_challenges: metadata.current_challenges,
          stripe_session_id: session.id,
          payment_status: 'paid',
          payment_amount: session.amount_total,
        });

      if (workshopError) {
        console.error('Error creating workshop registration:', workshopError);
      }
    }

    // Log activity
    await supabase
      .from('lead_activities')
      .insert({
        lead_id: lead.id,
        activity_type: 'checkout_completed',
        description: `Completed checkout for ${metadata.product || 'workshop'}`,
        metadata: {
          session_id: session.id,
          amount: session.amount_total,
          currency: session.currency,
        }
      });

    // Send welcome email
    if (metadata.source === 'workshop') {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const { error: emailError } = await resend.emails.send({
        from: 'Sprinter AI <hello@sprinter.ai>',
        to: customerEmail,
        subject: 'Welcome to Sprinter AI - Workshop Registration Confirmed',
        html: `
          <h2>Welcome to Sprinter AI!</h2>
          <p>Hi ${session.customer_details?.name || 'there'},</p>
          <p>Thank you for registering for our AI Operating Partner workshop. We're excited to help you deliver real AI value in 30-45 days.</p>
          <h3>Workshop Details:</h3>
          <ul>
            <li>Date: ${metadata.workshop_date || 'To be scheduled'}</li>
            <li>Time: ${metadata.workshop_time || 'To be scheduled'}</li>
            <li>Format: ${metadata.workshop_type || '90-minute virtual session'}</li>
          </ul>
          <p>You'll receive a calendar invite with the Zoom link 24 hours before the workshop.</p>
          <h3>What to Expect:</h3>
          <ul>
            <li>Practical AI implementation strategies for PE portfolios</li>
            <li>Live demos of our prebuilt solutions (AP automation, Quote Intelligence, 3PL Ops)</li>
            <li>Governance frameworks that satisfy LP requirements</li>
            <li>Q&A with our AI experts</li>
          </ul>
          <p>If you have any questions, reply to this email or call us at +1 (615) 601-0782.</p>
          <p>Best regards,<br>The Sprinter AI Team</p>
        `,
        });

        if (emailError) {
          console.error('Error sending welcome email:', emailError);
        } else {
        // Log email sent
        await supabase
          .from('email_communications')
          .insert({
            lead_id: lead.id,
            email_type: 'workshop_confirmation',
            subject: 'Welcome to Sprinter AI - Workshop Registration Confirmed',
            status: 'sent',
            sent_at: new Date().toISOString(),
            });
        }
      }
    }
  } catch (error) {
    console.error('Error in handleCheckoutComplete:', error);
  }
}

/**
 * Handle subscription updates (created or updated)
 */
export async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const supabase = await createClient();

  try {
    const customerId = subscription.customer as string;

    // Get lead by stripe customer ID
    const { data: lead } = await supabase
      .from('leads')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    // Upsert subscription record
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customerId,
        stripe_price_id: subscription.items.data[0]?.price.id,
        lead_id: lead?.id,
        status: subscription.status,
        current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
        cancel_at: (subscription as any).cancel_at ? new Date((subscription as any).cancel_at * 1000).toISOString() : null,
        canceled_at: (subscription as any).canceled_at ? new Date((subscription as any).canceled_at * 1000).toISOString() : null,
        trial_start: (subscription as any).trial_start ? new Date((subscription as any).trial_start * 1000).toISOString() : null,
        trial_end: (subscription as any).trial_end ? new Date((subscription as any).trial_end * 1000).toISOString() : null,
        plan_name: subscription.items.data[0]?.price.nickname || subscription.items.data[0]?.price.id,
        plan_amount: subscription.items.data[0]?.price.unit_amount || 0,
        plan_currency: subscription.items.data[0]?.price.currency,
        plan_interval: subscription.items.data[0]?.price.recurring?.interval,
        metadata: subscription.metadata,
      }, {
        onConflict: 'stripe_subscription_id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('Error updating subscription:', error);
      return;
    }

    // Update lead status if new subscription
    if (lead && subscription.status === 'active') {
      await supabase
        .from('leads')
        .update({
          status: 'converted',
          converted_at: new Date().toISOString(),
        })
        .eq('id', lead.id);

      // Log activity
      await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          activity_type: 'subscription_activated',
          description: `Subscription ${subscription.id} activated`,
          metadata: {
            subscription_id: subscription.id,
            status: subscription.status,
            plan: subscription.items.data[0]?.price.nickname,
          }
        });
    }
  } catch (error) {
    console.error('Error in handleSubscriptionUpdate:', error);
  }
}

/**
 * Handle subscription cancellation
 */
export async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const supabase = await createClient();

  try {
    const customerId = subscription.customer as string;

    // Update subscription status
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating canceled subscription:', error);
      return;
    }

    // Get lead for offboarding email
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (lead) {
      // Send offboarding email
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const { error: emailError } = await resend.emails.send({
        from: 'Sprinter AI <hello@sprinter.ai>',
        to: lead.email,
        subject: 'Subscription Canceled - We\'re Here to Help',
        html: `
          <h2>Subscription Canceled</h2>
          <p>Hi ${lead.full_name || 'there'},</p>
          <p>We've received your request to cancel your Sprinter AI subscription. Your access will remain active until the end of your current billing period.</p>
          <h3>Before You Go:</h3>
          <ul>
            <li>Download any reports or data you need from your dashboard</li>
            <li>Review your implementation documentation</li>
            <li>Contact support if you need assistance with the transition</li>
          </ul>
          <p>We'd love to understand how we could have served you better. Please reply to this email with any feedback.</p>
          <p>If you change your mind, you can reactivate your subscription at any time.</p>
          <p>Thank you for being part of the Sprinter AI journey.</p>
          <p>Best regards,<br>The Sprinter AI Team</p>
        `,
        });

        if (!emailError) {
          // Log email
          await supabase
          .from('email_communications')
          .insert({
            lead_id: lead.id,
            email_type: 'subscription_canceled',
            subject: 'Subscription Canceled - We\'re Here to Help',
            status: 'sent',
            sent_at: new Date().toISOString(),
            });
        }
      }

      // Log cancellation activity
      await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          activity_type: 'subscription_canceled',
          description: 'Subscription canceled',
          metadata: {
            subscription_id: subscription.id,
            cancel_reason: subscription.cancellation_details?.reason,
            feedback: subscription.cancellation_details?.feedback,
          }
        });
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCanceled:', error);
  }
}