import { v2 as cloudinary } from "cloudinary";
import { supabaseAdmin } from "@/lib/supabase";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const parent_id = data.get("parent_id");

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "anna-portfolio/details" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  const { error } = await supabaseAdmin.from("detail_images").insert({
    parent_id: parseInt(parent_id),
    url: result.secure_url,
    public_id: result.public_id,
  });

  if (error) {
    return Response.json({ error: "Database insert failed" }, { status: 500 });
  }

  return Response.json({ url: result.secure_url, public_id: result.public_id });
}