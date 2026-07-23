import { supabase } from "@/lib/supabase";

/**
 * Uploads a payment slip screenshot to Supabase Storage and returns its public URL.
 */
export async function uploadReceiptImage(file: File, bucket = "payment-image"): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `slips/${fileName}`;

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
    });

    if (error) {
        throw new Error(`Failed to upload slip image: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrlData.publicUrl;
}
