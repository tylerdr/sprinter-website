"use client";

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

export class ChatErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chat Widget Error:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack,
    });

    // Log to analytics/monitoring service
    if (typeof window !== 'undefined') {
      // You can integrate with services like Sentry here
      console.error('Chat error logged:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Chat Temporarily Unavailable</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              We're experiencing some technical difficulties with the chat widget.
              You can still contact us directly.
            </p>

            <div className="flex flex-col gap-2">
              <Button
                onClick={this.handleReset}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                asChild
                variant="default"
                size="sm"
                className="w-full bg-brand-gradient"
              >
                <a href="/contact">Contact Us Directly</a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <a href="mailto:hello@sprinter.ai">
                  Email: hello@sprinter.ai
                </a>
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-xs">
                <summary className="cursor-pointer text-muted-foreground">
                  Debug Info (Dev Only)
                </summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                  {this.state.errorInfo}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}