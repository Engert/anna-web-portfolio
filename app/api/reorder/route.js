import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  const { images } = await request.json();

  const updates = images.map((image, index) =>
    supabaseAdmin.from("images").update({ order_index: index }).eq("id", image.id)
  );

  await Promise.all(updates);

  return Response.json({ success: true });
}