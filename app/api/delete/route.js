import { v2 as cloudinary } from "cloudinary";
import { supabaseAdmin } from "@/lib/supabase";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  const { id, public_id } = await request.json();

  const cloudinaryResult = await cloudinary.uploader.destroy(public_id);

  if (cloudinaryResult.result !== "ok") {
    return Response.json({ error: "Cloudinary delete failed" }, { status: 500 });
  }

  const { error } = await supabaseAdmin.from("images").delete().eq("id", id);

  if (error) {
    return Response.json({ error: "Database delete failed" }, { status: 500 });
  }

  return Response.json({ success: true });
}