'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  FileUp,
  Eye
} from 'lucide-react';

interface Attribute {
  id: string;
  name: string;
  definition: string;
  prompt: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'list';
  value?: string | number | boolean | string[] | null;
  isExtracting?: boolean;
  error?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
  base64?: string;
}

export default function PDFExtractorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [attributeInput, setAttributeInput] = useState('');
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionComplete, setExtractionComplete] = useState(false);

  useEffect(() => {
    document.title = 'PDF Attribute Extraction - Sprinter AI Labs';
  }, []);

  const steps = [
    { title: 'Define Attributes', icon: FileText },
    { title: 'Validate Content', icon: CheckCircle2 },
    { title: 'Upload Documents', icon: Upload },
    { title: 'Review Data', icon: Eye }
  ];

  const handleDefineAttributes = async () => {
    if (!attributeInput.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await fetch('/api/ai/expand-attributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: attributeInput })
      });

      const data = await response.json();
      // Handle both array response and object with nested array
      const expandedAttributes = Array.isArray(data) ? data : (data.object || data);
      if (!Array.isArray(expandedAttributes)) {
        console.error('Invalid response format from expand-attributes API');
        return;
      }
      setAttributes(expandedAttributes);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error expanding attributes');
    }
    setIsProcessing(false);
  };

  const handleEditAttribute = (id: string, field: keyof Attribute, value: string | 'text' | 'number' | 'date' | 'boolean' | 'list') => {
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(prev => prev.filter(attr => attr.id !== id));
  };

  const handleAddAttribute = () => {
    const newAttribute: Attribute = {
      id: Date.now().toString(),
      name: '',
      definition: '',
      prompt: '',
      type: 'text'
    };
    setAttributes([...attributes, newAttribute]);
    setEditingId(newAttribute.id);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const processedFiles = await Promise.all(files.map(async (file) => {
      const base64 = await fileToBase64(file);
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      return { file, base64, preview };
    }));
    
    setUploadedFiles(processedFiles);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleExtraction = async () => {
    if (uploadedFiles.length === 0 || attributes.length === 0) return;
    
    setIsProcessing(true);
    setCurrentStep(3);

    // Extract attributes in parallel for each file
    for (const uploadedFile of uploadedFiles) {
      const extractionPromises = attributes.map(async (attribute) => {
        setAttributes(prev => prev.map(attr => 
          attr.id === attribute.id ? { ...attr, isExtracting: true } : attr
        ));

        try {
          const response = await fetch('/api/ai/extract-attribute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64: uploadedFile.base64,
              attribute: {
                name: attribute.name,
                prompt: attribute.prompt,
                type: attribute.type
              }
            })
          });

          const result = await response.json();
          
          setAttributes(prev => prev.map(attr => 
            attr.id === attribute.id 
              ? { ...attr, value: result.value, isExtracting: false } 
              : attr
          ));
        } catch (error) {
          setAttributes(prev => prev.map(attr => 
            attr.id === attribute.id 
              ? { ...attr, error: 'Extraction failed', isExtracting: false } 
              : attr
          ));
        }
      });

      await Promise.allSettled(extractionPromises);
    }
    
    setIsProcessing(false);
    setExtractionComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              PDF Attribute Extraction
            </h1>
            <p className="text-gray-400 text-lg">
              Extract structured data from unstructured documents with AI
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full mb-2
                    ${currentStep >= index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400'}
                  `}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs text-center ${
                    currentStep >= index ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-1 mx-2 -mt-8
                    ${currentStep > index ? 'bg-blue-500' : 'bg-gray-700'}
                  `} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Define Attributes */}
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-8 bg-gray-800/50 backdrop-blur border-gray-700">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    What information do you want to extract?
                  </h2>
                  <Textarea
                    value={attributeInput}
                    onChange={(e) => setAttributeInput(e.target.value)}
                    placeholder="Enter attributes in natural language, e.g.:
- Invoice number
- Total amount
- Due date
- Vendor name and address
- Line items with descriptions and amounts"
                    className="min-h-[200px] bg-gray-900/50 border-gray-600 text-white mb-6"
                  />
                  <Button
                    onClick={handleDefineAttributes}
                    disabled={!attributeInput.trim() || isProcessing}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Expanding attributes...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Expand with AI
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Validate Content */}
            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-8 bg-gray-800/50 backdrop-blur border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                      Review and Edit Attributes
                    </h2>
                    <Button
                      onClick={handleAddAttribute}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Attribute
                    </Button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {attributes.map((attr) => (
                      <div key={attr.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        {editingId === attr.id ? (
                          <div className="space-y-3">
                            <Input
                              value={attr.name}
                              onChange={(e) => handleEditAttribute(attr.id, 'name', e.target.value)}
                              placeholder="Attribute name"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                            <Textarea
                              value={attr.definition}
                              onChange={(e) => handleEditAttribute(attr.id, 'definition', e.target.value)}
                              placeholder="Definition"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                            <Textarea
                              value={attr.prompt}
                              onChange={(e) => handleEditAttribute(attr.id, 'prompt', e.target.value)}
                              placeholder="Extraction prompt"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                            <select
                              value={attr.type}
                              onChange={(e) => handleEditAttribute(attr.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                              <option value="boolean">Boolean</option>
                              <option value="list">List</option>
                            </select>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setEditingId(null)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => setEditingId(null)}
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold text-white">{attr.name}</h3>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => setEditingId(attr.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteAttribute(attr.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-1">
                              <span className="font-medium">Definition:</span> {attr.definition}
                            </p>
                            <p className="text-gray-400 text-sm mb-1">
                              <span className="font-medium">Prompt:</span> {attr.prompt}
                            </p>
                            <p className="text-gray-400 text-sm">
                              <span className="font-medium">Type:</span> {attr.type}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep(0)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={attributes.length === 0}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Upload Documents */}
            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-8 bg-gray-800/50 backdrop-blur border-gray-700">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Upload Documents
                  </h2>

                  <div className="mb-6">
                    <Label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-800/50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-12 h-12 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, Images, or Slide Decks
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,image/*,.ppt,.pptx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Uploaded Files ({uploadedFiles.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                              {file.preview ? (
                                <img 
                                  src={file.preview} 
                                  alt={file.file.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <FileText className="w-12 h-12 text-gray-600" />
                                </div>
                              )}
                            </div>
                            <p className="mt-2 text-xs text-gray-400 truncate">
                              {file.file.name}
                            </p>
                            <Button
                              onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleExtraction}
                      disabled={uploadedFiles.length === 0 || isProcessing}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Extracting...
                        </>
                      ) : (
                        <>
                          Extract Data
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Review Data */}
            {currentStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-8 bg-gray-800/50 backdrop-blur border-gray-700">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Extracted Data
                  </h2>

                  <div className="space-y-4 mb-6">
                    {attributes.map((attr) => (
                      <div key={attr.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {attr.name}
                            </h3>
                            {attr.isExtracting ? (
                              <div className="flex items-center text-gray-400">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Extracting...
                              </div>
                            ) : attr.error ? (
                              <p className="text-red-400">{attr.error}</p>
                            ) : attr.value !== undefined ? (
                              <div className="p-3 bg-gray-800 rounded border border-gray-700">
                                <pre className="text-gray-300 whitespace-pre-wrap">
                                  {typeof attr.value === 'object' 
                                    ? JSON.stringify(attr.value, null, 2)
                                    : attr.value}
                                </pre>
                              </div>
                            ) : (
                              <p className="text-gray-500">Pending...</p>
                            )}
                          </div>
                          {attr.value !== undefined && !attr.isExtracting && (
                            <CheckCircle2 className="w-5 h-5 text-green-500 ml-3 mt-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {extractionComplete && (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          const data = attributes.reduce((acc, attr) => ({
                            ...acc,
                            [attr.name]: attr.value
                          }), {});
                          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'extracted-data.json';
                          a.click();
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Export as JSON
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentStep(0);
                          setAttributes([]);
                          setUploadedFiles([]);
                          setAttributeInput('');
                          setExtractionComplete(false);
                        }}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Start New Extraction
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

