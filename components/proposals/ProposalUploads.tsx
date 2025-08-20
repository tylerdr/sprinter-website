'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, File, Download, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  uploadProposalFile, 
  getProposalUploads, 
  getUploadUrl,
  trackProposalEvent 
} from '@/lib/services/proposal'
import type { ProposalUpload } from '@/lib/types/proposal'
import { cn } from '@/lib/utils'

interface ProposalUploadsProps {
  proposalId: string
}

export default function ProposalUploads({ proposalId }: ProposalUploadsProps) {
  const [uploads, setUploads] = useState<ProposalUpload[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProposalUploads(proposalId)
        setUploads(data)
      } catch (error) {
        console.error('Failed to load uploads:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [proposalId])
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files)
    }
  }
  
  const handleFiles = async (files: FileList) => {
    setUploading(true)
    
    for (const file of Array.from(files)) {
      try {
        const upload = await uploadProposalFile(
          proposalId,
          file,
          'client_upload',
          `Uploaded ${new Date().toLocaleDateString()}`
        )
        
        setUploads(prev => [upload, ...prev])
        
        // Track upload event
        trackProposalEvent(proposalId, 'file_uploaded', undefined, {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        })
      } catch (error) {
        console.error('Failed to upload file:', error)
      }
    }
    
    setUploading(false)
  }
  
  const handleDownload = async (upload: ProposalUpload) => {
    const url = await getUploadUrl(upload.storagePath)
    window.open(url, '_blank')
  }
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }
  
  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <File className="h-4 w-4" />
    
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('image')) return '🖼️'
    if (fileType.includes('video')) return '🎥'
    if (fileType.includes('audio')) return '🎵'
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return '📊'
    if (fileType.includes('document') || fileType.includes('word')) return '📝'
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📽️'
    
    return <File className="h-4 w-4" />
  }
  
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Data Room</h2>
        <p className="text-muted-foreground mb-6">
          Upload and share documents related to this proposal. All files are securely stored and accessible only to authorized parties.
        </p>
        
        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-border",
            uploading && "opacity-50 pointer-events-none"
          )}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Support for PDF, DOC, XLS, Images, and more (max 50MB per file)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </div>
      </Card>
      
      {/* File List */}
      {uploads.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Uploaded Files ({uploads.length})</h3>
          
          <div className="space-y-2">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFileIcon(upload.fileType)}</span>
                  
                  <div>
                    <p className="font-medium">{upload.fileName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(upload.fileSize)}</span>
                      <span>•</span>
                      <span>{new Date(upload.uploadedAt).toLocaleDateString()}</span>
                      {upload.category && (
                        <>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {upload.category}
                          </Badge>
                        </>
                      )}
                    </div>
                    {upload.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {upload.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(upload)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {uploads.length === 0 && !loading && (
        <Card className="p-12 text-center">
          <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No files uploaded yet</p>
        </Card>
      )}
    </div>
  )
}