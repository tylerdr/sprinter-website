/**
 * File upload server actions
 */

"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export interface UploadedAttachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  storage_path: string;
  bucket: string;
  url: string;
  created_at: string;
}

/**
 * Upload chat attachments to Supabase storage
 */
export async function uploadChatAttachmentsAction(
  formData: FormData
): Promise<{ attachments: UploadedAttachment[]; error?: string }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { attachments: [], error: "Unauthorized" };
  }

  const uploadedFiles: UploadedAttachment[] = [];
  const files = formData.getAll('files') as File[];
  const chatId = formData.get('chatId') as string;

  for (const file of files) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const storagePath = `${user.id}/${fileName}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('chat-attachments')
        .upload(storagePath, file, {
          contentType: file.type,
        });

      if (error) {
        console.error('Error uploading file:', error);
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('chat-attachments')
        .getPublicUrl(storagePath);

      uploadedFiles.push({
        id: uuidv4(),
        filename: file.name,
        content_type: file.type,
        size: file.size,
        storage_path: storagePath,
        bucket: 'chat-attachments',
        url: publicUrl,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error uploading attachment:', error);
      return { attachments: uploadedFiles, error: String(error) };
    }
  }

  return { attachments: uploadedFiles };
}

/**
 * Refresh attachment URL if it has expired
 */
export async function refreshChatAttachmentUrlAction(
  storagePath: string
): Promise<{ url: string | null }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { url: null };
  }

  try {
    // Get a new public URL for the attachment
    const { data: { publicUrl } } = supabase.storage
      .from('chat-attachments')
      .getPublicUrl(storagePath);

    return { url: publicUrl };
  } catch (error) {
    console.error('Error refreshing attachment URL:', error);
    return { url: null };
  }
}