'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Message } from '@/components/ai/message';
import { Thinking } from '@/components/ai/thinking';
import { ToolInvocation } from '@/components/ai/tool-invocation';
import { ChatInterface } from '@/components/ai/chat-interface';
import { LabLayout } from '@/components/labs/LabLayout';
import { AnimatePresence } from 'framer-motion';

export default function AIElementsDemoPage() {
  const [showThinking, setShowThinking] = useState(false);
  const [toolStatus, setToolStatus] = useState<'pending' | 'running' | 'success' | 'error'>('pending');

  return (
    <LabLayout
      title="AI Elements Demo"
      description="Interactive demonstration of AI SDK v5 Elements"
      category="agents"
    >
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            AI <span className="gradient-text">Elements</span> Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the building blocks of AI interfaces using Vercel AI SDK v5 Elements
          </p>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="thinking">Thinking</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="chat">Full Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Components</CardTitle>
                <CardDescription>
                  Different message types with markdown support and avatars
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Message
                  role="user"
                  content="How can AI help my business?"
                />
                <Message
                  role="assistant"
                  content="AI can help your business in several ways:

1. **Automation**: Streamline repetitive tasks
2. **Data Analysis**: Extract insights from large datasets
3. **Customer Service**: 24/7 intelligent support
4. **Content Generation**: Create marketing materials at scale

Would you like to explore any of these areas in detail?"
                />
                <Message
                  role="system"
                  content="System message: This conversation is being recorded for quality purposes."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thinking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thinking Component</CardTitle>
                <CardDescription>
                  Show when AI is processing or reasoning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setShowThinking(true);
                    setTimeout(() => setShowThinking(false), 3000);
                  }}
                >
                  Trigger Thinking Animation
                </Button>
                
                <AnimatePresence>
                  {showThinking && (
                    <>
                      <Thinking />
                      <Thinking message="Analyzing your requirements..." />
                      <Thinking message="Searching knowledge base..." />
                    </>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Invocation</CardTitle>
                <CardDescription>
                  Display when AI is using external tools or functions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={() => setToolStatus('pending')}>Pending</Button>
                  <Button onClick={() => setToolStatus('running')}>Running</Button>
                  <Button onClick={() => setToolStatus('success')}>Success</Button>
                  <Button onClick={() => setToolStatus('error')}>Error</Button>
                </div>

                <div className="space-y-4">
                  <ToolInvocation
                    toolName="searchDatabase"
                    args={{ query: "customer data", limit: 10 }}
                    status={toolStatus}
                    result={toolStatus === 'success' ? { count: 42, records: ['...'] } : undefined}
                  />
                  
                  <ToolInvocation
                    toolName="generateReport"
                    args={{ format: "PDF", includeCharts: true }}
                    status="success"
                    result="Report generated successfully"
                  />
                  
                  <ToolInvocation
                    toolName="sendEmail"
                    args={{ to: "client@example.com", subject: "AI Analysis Results" }}
                    status="error"
                    result={undefined}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full Chat Interface</CardTitle>
                <CardDescription>
                  Complete chat experience using the useChat hook
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] border rounded-lg">
                  <ChatInterface
                    placeholder="Try asking about AI implementation..."
                    welcomeMessage="Welcome to the AI Elements demo! Ask me anything about implementing AI in your business."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LabLayout>
  );
}