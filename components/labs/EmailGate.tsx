'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Mail, Shield, Zap } from 'lucide-react';

interface EmailGateProps {
  onEmailSubmit: (email: string) => Promise<boolean>;
  labName?: string;
}

export function EmailGate({ onEmailSubmit, labName = 'this lab' }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    const success = await onEmailSubmit(email);
    if (!success) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-brand-gradient flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Unlock Full Access to {labName}</CardTitle>
          <CardDescription>
            You&apos;ve used your free demo. Enter your email to continue exploring and get your personalized AI Opportunity Audit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Unlocking...' : 'Unlock Access & Get AI Audit'}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Receive your personalized AI Opportunity Audit with ROI projections</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Unlimited access to all AI Labs and demos</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}