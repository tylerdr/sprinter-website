'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface LabGateState {
  allowed: boolean;
  needsEmail: boolean;
  isLoading: boolean;
  userEmail?: string;
}

export function useLabsGate(labSlug: string, costTier: 'low' | 'medium' | 'high' = 'low') {
  const [state, setState] = useState<LabGateState>({
    allowed: false,
    needsEmail: false,
    isLoading: true
  });

  const supabase = createClient();

  useEffect(() => {
    (async () => {
      try {
        // Get or create session
        const { data: sessionData } = await supabase.auth.getSession();
        let userId: string | undefined;
        let userEmail: string | undefined;

        if (!sessionData?.session) {
          // Create anonymous user
          const { data, error } = await supabase.auth.signInAnonymously();
          if (!error && data.user) {
            userId = data.user.id;
          }
        } else {
          userId = sessionData.session.user.id;
          userEmail = sessionData.session.user.email;
        }

        if (!userId) {
          setState({ allowed: false, needsEmail: true, isLoading: false });
          return;
        }

        // Check usage for this lab
        const response = await fetch(`/api/labs/usage?lab=${labSlug}`, {
          cache: 'no-store'
        });
        const { runs = 0, hasEmail } = await response.json();

        // Determine access rules
        const isCostly = costTier !== 'low';
        
        // If costly lab, require email immediately
        if (isCostly && !hasEmail) {
          setState({ allowed: false, needsEmail: true, isLoading: false, userEmail });
          return;
        }

        // For low-cost labs, allow first use without email
        if (runs === 0) {
          setState({ allowed: true, needsEmail: false, isLoading: false, userEmail });
        } else if (!hasEmail) {
          setState({ allowed: false, needsEmail: true, isLoading: false, userEmail });
        } else {
          setState({ allowed: true, needsEmail: false, isLoading: false, userEmail });
        }
      } catch (error) {
        console.error('Lab gate error:', error);
        setState({ allowed: true, needsEmail: false, isLoading: false }); // Fail open for now
      }
    })();
  }, [labSlug, costTier, supabase]);

  const captureEmail = async (email: string): Promise<boolean> => {
    try {
      // Update user with email
      const { error } = await supabase.auth.updateUser({ email });
      if (!error) {
        // Mark as emailed
        await fetch('/api/leads/mark-emailed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'labs_gate' })
        });
        
        setState(prev => ({ ...prev, allowed: true, needsEmail: false, userEmail: email }));
        return true;
      }
    } catch (error) {
      console.error('Email capture error:', error);
    }
    return false;
  };

  const recordUsage = async () => {
    try {
      await fetch('/api/labs/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lab: labSlug })
      });
    } catch (error) {
      console.error('Usage recording error:', error);
    }
  };

  return { ...state, captureEmail, recordUsage };
}