import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// This runs daily via Vercel Cron
// Configure in vercel.json: 
// { "crons": [{ "path": "/api/cron/generate-daily", "schedule": "0 9 * * *" }] }

const GENERATION_SCHEDULE = {
  monday: { type: 'industry', count: 1 },
  tuesday: { type: 'use-case', count: 2 },
  wednesday: { type: 'location', count: 1 },
  thursday: { type: 'comparison', count: 1 },
  friday: { type: 'tool', count: 1 },
};

export async function GET(request: NextRequest) {
  try {
    // Verify this is from Vercel Cron
    const authHeader = (await headers()).get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current day
    const day = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3);
    const dayMap: { [key: string]: keyof typeof GENERATION_SCHEDULE } = {
      mon: 'monday',
      tue: 'tuesday',
      wed: 'wednesday',
      thu: 'thursday',
      fri: 'friday',
    };
    
    const schedule = GENERATION_SCHEDULE[dayMap[day] || 'monday'];

    // Call our generation API
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/pseo/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PSEO_API_KEY}`,
      },
      body: JSON.stringify({
        type: schedule.type,
        batchSize: schedule.count,
      }),
    });

    if (!response.ok) {
      throw new Error(`Generation failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Log results for monitoring
    console.log(`Daily generation complete:`, result);

    // Send notification if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `✨ Daily content generation complete: ${result.generated} ${schedule.type} pages created`,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      day: dayMap[day],
      generated: result.generated,
      type: schedule.type,
    });

  } catch (error) {
    console.error('Cron generation error:', error);
    
    // Send error notification if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `❌ Daily content generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }),
      });
    }

    return NextResponse.json(
      { error: 'Generation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}