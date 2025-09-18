import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

export async function uploadToBucket(
  bucketName: string,
  path: string,
  file: File | Buffer | ArrayBuffer,
  options?: {
    contentType?: string;
    upsert?: boolean;
  }
): Promise<{ data?: any; error?: any }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        contentType: options?.contentType,
        upsert: options?.upsert ?? false,
      });

    if (error) {
      logger.error("Failed to upload file", { bucketName, path, error });
      return { error };
    }

    return { data };
  } catch (error) {
    logger.error("Upload error", { bucketName, path, error });
    return { error };
  }
}

export async function getSignedUrl(
  bucketName: string,
  path: string,
  expiresIn: number = 3600
): Promise<{ data?: { signedUrl: string }; error?: any }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresIn);

    if (error) {
      logger.error("Failed to create signed URL", { bucketName, path, error });
      return { error };
    }

    return { data };
  } catch (error) {
    logger.error("Signed URL error", { bucketName, path, error });
    return { error };
  }
}

export async function deleteFromBucket(
  bucketName: string,
  paths: string[]
): Promise<{ data?: any; error?: any }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove(paths);

    if (error) {
      logger.error("Failed to delete files", { bucketName, paths, error });
      return { error };
    }

    return { data };
  } catch (error) {
    logger.error("Delete error", { bucketName, paths, error });
    return { error };
  }
}

export async function downloadFromBucket(
  bucketName: string,
  path: string
): Promise<{ data?: Blob; error?: any }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(path);

    if (error) {
      logger.error("Failed to download file", { bucketName, path, error });
      return { error };
    }

    return { data };
  } catch (error) {
    logger.error("Download error", { bucketName, path, error });
    return { error };
  }
}