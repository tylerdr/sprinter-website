"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Palette, Type, MousePointer, RefreshCw } from "lucide-react";

interface AdFormat {
  name: string;
  platform: string;
  width: number;
  height: number;
  description: string;
}

interface AdData {
  productName: string;
  tagline: string;
  ctaText: string;
  style: string;
  colorScheme: string;
  uploadedImage?: string;
}

interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

const AD_FORMATS: AdFormat[] = [
  { name: "Instagram Square", platform: "Instagram", width: 1080, height: 1080, description: "Square post" },
  { name: "Instagram Story", platform: "Instagram", width: 1080, height: 1920, description: "Vertical story" },
  { name: "Twitter/X Post", platform: "Twitter", width: 1200, height: 675, description: "Horizontal post" },
  { name: "LinkedIn Post", platform: "LinkedIn", width: 1200, height: 627, description: "Professional post" },
  { name: "Banner Ad", platform: "Web", width: 728, height: 90, description: "Display banner" },
];

const STYLES = [
  { name: "Modern", description: "Clean and contemporary" },
  { name: "Classic", description: "Timeless and elegant" },
  { name: "Bold", description: "Vibrant and eye-catching" },
  { name: "Minimal", description: "Simple and refined" },
];

const COLOR_SCHEMES: ColorScheme[] = [
  { name: "Brand Blue", primary: "#0066CC", secondary: "#004499", accent: "#FFD700", text: "#FFFFFF", background: "#001122" },
  { name: "Sunset", primary: "#FF6B35", secondary: "#F7931E", accent: "#FFD23F", text: "#FFFFFF", background: "#2C1810" },
  { name: "Forest", primary: "#228B22", secondary: "#006400", accent: "#90EE90", text: "#FFFFFF", background: "#0D2818" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#7C3AED", accent: "#F59E0B", text: "#FFFFFF", background: "#1E1B4B" },
  { name: "Monochrome", primary: "#000000", secondary: "#4A4A4A", accent: "#FFD700", text: "#FFFFFF", background: "#F5F5F5" },
];

export default function AdCreator() {
  const [adData, setAdData] = useState<AdData>({
    productName: "Sprinter AI",
    tagline: "Build at the Speed of Thought",
    ctaText: "Get Started Today",
    style: "Modern",
    colorScheme: "Brand Blue",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<string[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const selectedColorScheme = COLOR_SCHEMES.find(cs => cs.name === adData.colorScheme) || COLOR_SCHEMES[0];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdData(prev => ({ ...prev, uploadedImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAds = async () => {
    setIsGenerating(true);
    setGeneratedAds([]);

    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate ads for each format
    const ads: string[] = [];
    for (let i = 0; i < AD_FORMATS.length; i++) {
      const canvas = canvasRefs.current[i];
      if (canvas) {
        const dataUrl = await generateCanvasAd(canvas, AD_FORMATS[i], adData, selectedColorScheme);
        ads.push(dataUrl);
      }
    }

    setGeneratedAds(ads);
    setIsGenerating(false);
  };

  const generateCanvasAd = async (
    canvas: HTMLCanvasElement, 
    format: AdFormat, 
    data: AdData, 
    colors: ColorScheme
  ): Promise<string> => {
    const ctx = canvas.getContext('2d')!;
    canvas.width = format.width;
    canvas.height = format.height;

    // Clear canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, format.width, format.height);

    // Apply style-based effects
    if (data.style === "Modern") {
      // Modern gradient background
      const gradient = ctx.createLinearGradient(0, 0, format.width, format.height);
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(1, colors.secondary);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, format.width, format.height);
    } else if (data.style === "Bold") {
      // Bold geometric shapes
      ctx.fillStyle = colors.primary;
      ctx.fillRect(0, 0, format.width, format.height);
      
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(format.width * 0.8, format.height * 0.2, format.width * 0.15, 0, Math.PI * 2);
      ctx.fill();
    } else if (data.style === "Minimal") {
      // Clean white background with subtle accent
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, format.width, format.height);
      
      ctx.fillStyle = colors.primary;
      ctx.fillRect(0, format.height - 10, format.width, 10);
    } else {
      // Classic elegant background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, format.width, format.height);
      
      // Add border
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, format.width - 40, format.height - 40);
    }

    // Draw uploaded image if available
    if (data.uploadedImage) {
      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = data.uploadedImage!;
      });
      
      // Calculate image placement based on format
      let imgX, imgY, imgWidth, imgHeight;
      
      if (format.height > format.width) {
        // Vertical format - place image at top
        imgHeight = format.height * 0.4;
        imgWidth = (img.width / img.height) * imgHeight;
        imgX = (format.width - imgWidth) / 2;
        imgY = format.height * 0.1;
      } else if (format.height < 200) {
        // Banner format - small image on left
        imgHeight = format.height * 0.6;
        imgWidth = (img.width / img.height) * imgHeight;
        imgX = format.width * 0.05;
        imgY = (format.height - imgHeight) / 2;
      } else {
        // Square or horizontal - center image
        imgWidth = format.width * 0.4;
        imgHeight = (img.height / img.width) * imgWidth;
        imgX = format.width * 0.05;
        imgY = (format.height - imgHeight) / 2;
      }
      
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    }

    // Text styling based on format and style
    const isVertical = format.height > format.width;
    const isBanner = format.height < 200;
    
    // Product name
    ctx.fillStyle = data.style === "Minimal" ? colors.primary : colors.text;
    ctx.font = `bold ${isBanner ? 24 : isVertical ? 64 : 48}px Arial, sans-serif`;
    ctx.textAlign = "center";
    
    let textY = data.uploadedImage ? 
      (isVertical ? format.height * 0.6 : format.height * 0.2) : 
      format.height * 0.3;
    
    if (isBanner) {
      ctx.textAlign = data.uploadedImage ? "right" : "center";
      const textX = data.uploadedImage ? format.width * 0.95 : format.width / 2;
      ctx.fillText(data.productName, textX, format.height * 0.3);
    } else {
      ctx.fillText(data.productName, format.width / 2, textY);
    }

    // Tagline
    ctx.fillStyle = data.style === "Minimal" ? colors.secondary : colors.text;
    ctx.font = `${isBanner ? 16 : isVertical ? 32 : 24}px Arial, sans-serif`;
    
    if (isBanner) {
      const textX = data.uploadedImage ? format.width * 0.95 : format.width / 2;
      ctx.fillText(data.tagline, textX, format.height * 0.55);
    } else {
      ctx.fillText(data.tagline, format.width / 2, textY + (isVertical ? 80 : 60));
    }

    // Call-to-action button
    if (!isBanner) {
      const buttonY = textY + (isVertical ? 160 : 120);
      const buttonWidth = 200;
      const buttonHeight = 50;
      const buttonX = (format.width - buttonWidth) / 2;

      // Button background
      ctx.fillStyle = colors.accent;
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

      // Button text
      ctx.fillStyle = colors.text;
      ctx.font = `bold 18px Arial, sans-serif`;
      ctx.fillText(data.ctaText, format.width / 2, buttonY + 32);
    }

    return canvas.toDataURL('image/png');
  };

  const downloadAd = (index: number) => {
    const canvas = canvasRefs.current[index];
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${adData.productName.replace(/\s+/g, '_')}_${AD_FORMATS[index].name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const loadSampleData = () => {
    setAdData({
      productName: "Sprinter AI",
      tagline: "Build at the Speed of Thought",
      ctaText: "Start Building Today",
      style: "Modern",
      colorScheme: "Brand Blue",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-card/5 border border-border/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Ad Content & Styling</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={adData.productName}
                onChange={(e) => setAdData(prev => ({ ...prev, productName: e.target.value }))}
                className="w-full px-4 py-3 bg-card/10 border border-border/20 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <input
                type="text"
                value={adData.tagline}
                onChange={(e) => setAdData(prev => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-4 py-3 bg-card/10 border border-border/20 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm sm:text-base"
                placeholder="Your compelling tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Call-to-Action Text</label>
              <input
                type="text"
                value={adData.ctaText}
                onChange={(e) => setAdData(prev => ({ ...prev, ctaText: e.target.value }))}
                className="w-full px-4 py-3 bg-card/10 border border-border/20 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., Get Started Today"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Image (Optional)</label>
              <div className="border-2 border-dashed border-border/20 rounded-lg p-6 text-center hover:border-brand/30 transition-colors">
                {adData.uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={adData.uploadedImage} 
                      alt="Uploaded product" 
                      className="max-h-32 mx-auto rounded-lg"
                    />
                    <button
                      onClick={() => setAdData(prev => ({ ...prev, uploadedImage: undefined }))}
                      className="text-sm text-muted-foreground hover:text-brand"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a product image for better ads
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm">
                      <Upload className="w-4 h-4" />
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Style Options */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Design Style</label>
              <div className="grid grid-cols-2 gap-3">
                {STYLES.map((style) => (
                  <label key={style.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="style"
                      value={style.name}
                      checked={adData.style === style.name}
                      onChange={(e) => setAdData(prev => ({ ...prev, style: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      adData.style === style.name 
                        ? 'border-brand bg-brand-10' 
                        : 'border-border/20 bg-card/5 hover:border-brand/30'
                    }`}>
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{style.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Color Scheme</label>
              <div className="space-y-3">
                {COLOR_SCHEMES.map((scheme) => (
                  <label key={scheme.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="colorScheme"
                      value={scheme.name}
                      checked={adData.colorScheme === scheme.name}
                      onChange={(e) => setAdData(prev => ({ ...prev, colorScheme: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                      adData.colorScheme === scheme.name 
                        ? 'border-brand bg-brand-10' 
                        : 'border-border/20 bg-card/5 hover:border-brand/30'
                    }`}>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.primary }}></div>
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.secondary }}></div>
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: scheme.accent }}></div>
                      </div>
                      <span className="font-medium text-sm">{scheme.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={loadSampleData}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-border/20 rounded-lg hover:bg-card/10 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Load Sample
              </button>
              <button
                onClick={generateAds}
                disabled={isGenerating || !adData.productName.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm sm:text-base min-h-[44px]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Ads...
                  </>
                ) : (
                  <>
                    <Palette className="w-4 h-4" />
                    Generate Ads
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
            <span className="text-sm sm:text-base">AI is creating your ads...</span>
          </div>
          <div className="mt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
            <p>🎨 Applying design style and colors</p>
            <p>📐 Optimizing for each platform format</p>
            <p>✨ Generating high-quality visuals</p>
          </div>
        </div>
      )}

      {/* Generated Ads Grid */}
      {generatedAds.length > 0 && !isGenerating && (
        <div className="bg-card/5 border border-border/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Generated Ads</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_FORMATS.map((format, index) => (
              <div key={format.name} className="bg-card/5 border border-border/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{format.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {format.width} × {format.height}px • {format.description}
                    </p>
                  </div>
                  <button
                    onClick={() => downloadAd(index)}
                    className="p-2 hover:bg-card/10 rounded-lg transition-colors"
                    title="Download ad"
                  >
                    <Download className="w-4 h-4 text-brand" />
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-2 overflow-hidden">
                  <canvas
                    ref={(el) => canvasRefs.current[index] = el}
                    className="w-full h-auto border border-border/10 rounded"
                    style={{ 
                      maxHeight: format.height > format.width ? '300px' : '150px',
                      aspectRatio: `${format.width}/${format.height}`
                    }}
                  />
                </div>
                
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-brand-10 text-brand text-xs rounded-full">
                    {format.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden canvases for generation */}
      <div className="hidden">
        {AD_FORMATS.map((_, index) => (
          <canvas key={index} ref={(el) => canvasRefs.current[index] = el} />
        ))}
      </div>
    </div>
  );
}