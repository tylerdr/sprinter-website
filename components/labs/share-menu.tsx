"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { buildShareUrl, buildEmbedUrl } from "@/lib/share";
import { Check, Copy } from "lucide-react";

export function ShareMenu({ slug, state }: { slug: string; state: Record<string, unknown>; }) {
  const [shareUrl] = useState(() => buildShareUrl(slug, state));
  const [embedUrl] = useState(() => buildEmbedUrl(slug, state));
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  
  const iframe = `<iframe src="${embedUrl}" width="100%" height="600" style="border:0;border-radius:12px;" allow="clipboard-write; microphone; camera"></iframe>`;

  const copyToClipboard = async (text: string, type: 'share' | 'embed') => {
    await navigator.clipboard.writeText(text);
    if (type === 'share') {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } else {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share & Embed</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Share & Embed</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Share Link</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(shareUrl, 'share')}
              >
                {copiedShare ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea 
              readOnly 
              value={shareUrl} 
              onFocus={(e) => e.currentTarget.select()} 
              className="font-mono text-xs"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Embed Code</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(iframe, 'embed')}
              >
                {copiedEmbed ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea 
              readOnly 
              value={iframe} 
              onFocus={(e) => e.currentTarget.select()} 
              className="font-mono text-xs"
              rows={4}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}