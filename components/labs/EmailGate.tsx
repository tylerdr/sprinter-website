'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Mail, Shield, Zap, CheckCircle2, Gift, ArrowRight } from 'lucide-react';

interface EmailGateProps {
  onEmailSubmit: (data: { email: string; name?: string; company?: string; role?: string }) => Promise<boolean>;
  labName?: string;
  showFullForm?: boolean;
}

export function EmailGate({ onEmailSubmit, labName = 'this lab', showFullForm = false }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    const success = await onEmailSubmit({ email, name, company, role });
    if (!success) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Unlock {labName}</CardTitle>
          <CardDescription className="text-base">
            Get unlimited access to all 40+ AI tools plus a personalized AI opportunity report worth $5,000.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Stack */}
          <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-lg p-4 border border-green-500/10">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              What You Get (Free)
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>Unlimited access to all AI Labs & demos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>Personalized AI Opportunity Report ($5K value)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>ROI calculator results emailed to you</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>Weekly AI insights for PE & Family Offices</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {showFullForm && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Acme Capital"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operating-partner">Operating Partner</SelectItem>
                        <SelectItem value="principal">Principal / Partner</SelectItem>
                        <SelectItem value="family-office">Family Office</SelectItem>
                        <SelectItem value="ceo-cxo">CEO / CXO</SelectItem>
                        <SelectItem value="strategy">Strategy / Corp Dev</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

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
                className="h-12"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Unlocking...' : (
                <span className="flex items-center gap-2">
                  Unlock Free Access
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>Instant access</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}