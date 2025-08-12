'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Paperclip, 
  FileText, 
  X, 
  Loader2,
  Bot,
  User,
  Upload
} from 'lucide-react';

interface UploadedDocument {
  id: string;
  name: string;
  base64: string;
  type: string;
}

export default function PDFChatPage() {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    document.title = 'PDF Document Chat - Sprinter AI Labs';
  }, []);
  
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const processedFiles = await Promise.all(files.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        base64,
        type: file.type
      };
    }));
    
    setUploadedDocs(prev => [...prev, ...processedFiles]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const removeDocument = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || uploadedDocs.length === 0 || isLoading) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: chatInput };
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/pdf-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          documents: uploadedDocs
        })
      });
      
      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          assistantMessage += decoder.decode(value);
        }
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantMessage
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              PDF Document Chat
            </h1>
            <p className="text-gray-400 text-lg">
              Upload PDFs and chat with your documents using AI
            </p>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur border-gray-700 overflow-hidden">
            {/* Document Upload Area */}
            {uploadedDocs.length > 0 && (
              <div className="p-4 border-b border-gray-700 bg-gray-900/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">
                    Attached Documents ({uploadedDocs.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {uploadedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700"
                    >
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300 max-w-[150px] truncate">
                        {doc.name}
                      </span>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <ScrollArea className="h-[500px] p-6">
              {messages.length === 0 && uploadedDocs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Upload className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    No documents uploaded yet
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    Upload PDFs, images, or other documents to start chatting with them using AI
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              )}

              {messages.length === 0 && uploadedDocs.length > 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Bot className="w-16 h-16 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Documents ready!
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Ask me anything about your uploaded documents
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === 'assistant' ? '' : 'justify-end'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 ${
                        message.role === 'assistant'
                          ? 'bg-gray-700/50 text-gray-100'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-700/50 rounded-lg px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,image/*,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-400 hover:bg-gray-700"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={chatInput || ''}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    uploadedDocs.length > 0
                      ? "Ask about your documents..."
                      : "Upload documents to start chatting..."
                  }
                  disabled={uploadedDocs.length === 0 || isLoading}
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                />
                <Button
                  type="submit"
                  disabled={!chatInput?.trim() || uploadedDocs.length === 0 || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

