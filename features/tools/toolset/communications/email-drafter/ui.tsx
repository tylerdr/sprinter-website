"use client";
import type { ToolUI } from "../../../types";
import { Input as InputSchema, Output, RecipientType, EmailPurpose, EmailTone } from "./tool";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Copy, 
  Send, 
  Clock, 
  Eye,
  Edit,
  Sparkles,
  FileText,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DynamicSelectField } from "@/features/tools/shared/ui/dynamic-form-fields";

interface EmailOption {
  value: string;
  label: string;
  description?: string;
}

interface EmailDrafterUIProps {
  recipientTypes?: EmailOption[];
  purposes?: EmailOption[];
  tones?: EmailOption[];
}

const UI: ToolUI<typeof InputSchema, typeof Output> = {
  Result: ({ data }) => {
    const [copied, setCopied] = useState(false);
    const [selectedAlt, setSelectedAlt] = useState<number | null>(null);
    
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    
    const fullEmail = `Subject: ${data.subject}\n\n${data.body}`;
    
    return (
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email Draft
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                <Clock className="w-3 h-3 mr-1" />
                {data.metadata.estimatedReadTime} read
              </Badge>
              <Badge variant="outline" className="bg-white">
                <FileText className="w-3 h-3 mr-1" />
                {data.metadata.wordCount} words
              </Badge>
              <Badge variant="outline" className="bg-white">
                {data.metadata.tone}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">
                <Mail className="w-3 h-3 mr-1" />
                Email
              </TabsTrigger>
              <TabsTrigger value="alternatives">
                <Sparkles className="w-3 h-3 mr-1" />
                Alternative Subjects
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Subject Line</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(data.subject)}
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 mr-1" />
                    )}
                    Copy
                  </Button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-medium">{data.subject}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Email Body</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(data.body)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Body
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(fullEmail)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy All
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border min-h-[200px] whitespace-pre-wrap">
                  {data.body}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit in Email Client
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="alternatives" className="space-y-3">
              {data.alternatives && data.alternatives.map((alt, i) => (
                <Card 
                  key={i}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAlt === i ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => setSelectedAlt(i)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alt.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {alt.preview}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(alt.subject);
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="preview">
              <Card className="border-2">
                <CardHeader className="bg-gray-50 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <span className="font-medium w-16">From:</span>
                      <span className="text-muted-foreground">your.email@company.com</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="font-medium w-16">To:</span>
                      <span className="text-muted-foreground">recipient@email.com</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="font-medium w-16">Subject:</span>
                      <span>{data.subject}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{data.body}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  },
  
  Loading: () => (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 bg-muted rounded w-1/3"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  ),
  
  Error: ({ message }) => (
    <Card className="border-destructive">
      <CardContent className="pt-6">
        <p className="text-sm text-destructive">{message}</p>
      </CardContent>
    </Card>
  ),
  
  InputForm: ({ onSubmit }) => {
    const [keyPoints, setKeyPoints] = useState<string[]>([""]);
    
    const addKeyPoint = () => setKeyPoints([...keyPoints, ""]);
    const removeKeyPoint = (index: number) => {
      setKeyPoints(keyPoints.filter((_, i) => i !== index));
    };
    const updateKeyPoint = (index: number, value: string) => {
      const updated = [...keyPoints];
      updated[index] = value;
      setKeyPoints(updated);
    };
    
    return (
      <form 
        onSubmit={(e) => { 
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          
          onSubmit({
            recipientType: formData.get("recipientType") as any,
            recipientName: formData.get("recipientName") as string || undefined,
            purpose: formData.get("purpose") as any,
            tone: formData.get("tone") as any,
            keyPoints: keyPoints.filter(kp => kp.trim() !== ""),
            context: formData.get("context") as string || undefined,
            includeSignature: formData.get("includeSignature") === "true",
            senderName: formData.get("senderName") as string || undefined,
            senderTitle: formData.get("senderTitle") as string || undefined,
            companyName: formData.get("companyName") as string || undefined
          });
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Recipient Type</Label>
            <Select name="recipientType">
        <SelectTrigger className="w-full px-3 py-2 border rounded-md">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>

              {["borrower", "real_estate_agent", "underwriter", "processor", "appraiser", "title_company", "insurance_agent", "vendor", "other"].map(type => (
                <SelectItem key={type} value={type}>
                  {type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            
        </SelectContent>
      </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Recipient Name</Label>
            <Input 
              type="text"
              name="recipientName"
              placeholder="John Doe (optional)"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Email Purpose</Label>
            <Select name="purpose">
        <SelectTrigger className="w-full px-3 py-2 border rounded-md">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>

              {["initial_inquiry", "follow_up", "document_request", "status_update", "approval_notification", "denial_notification", "closing_coordination", "pre_approval", "rate_quote", "marketing", "other"].map(purpose => (
                <SelectItem key={purpose} value={purpose}>
                  {purpose.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            
        </SelectContent>
      </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Tone</Label>
            <Select name="tone">
        <SelectTrigger className="w-full px-3 py-2 border rounded-md">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>

              {["professional", "friendly", "urgent", "formal", "casual", "empathetic"].map(tone => (
                <SelectItem key={tone} value={tone}>
                  {tone.replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            
        </SelectContent>
      </Select>
          </div>
        </div>
        
        <div>
          <Label className="block text-sm font-medium mb-1">Key Points</Label>
          {keyPoints.map((point, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input
                type="text"
                value={point}
                onChange={(e) => updateKeyPoint(i, e.target.value)}
                placeholder={`Point ${i + 1}`}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button
                type="button"
                onClick={() => removeKeyPoint(i)}
                className="px-3 py-2 text-destructive hover:bg-destructive/10 rounded"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addKeyPoint}
            className="text-sm text-primary hover:underline"
          >
            + Add key point
          </Button>
        </div>
        
        <div>
          <Label className="block text-sm font-medium mb-1">Additional Context</Label>
          <Textarea 
            name="context"
            placeholder="Any additional details or context..."
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Input 
              type="checkbox"
              name="includeSignature"
              value="true"
              defaultChecked
            />
            <span className="text-sm">Include professional signature</span>
          </Label>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Sender Name</Label>
            <Input 
              type="text"
              name="senderName"
              placeholder="Your Name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Title</Label>
            <Input 
              type="text"
              name="senderTitle"
              placeholder="Loan Officer"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Company</Label>
            <Input 
              type="text"
              name="companyName"
              placeholder="ABC Mortgage"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          <Mail className="w-4 h-4 mr-2" />
          Generate Email
        </Button>
      </form>
    );
  }
};

export default UI;