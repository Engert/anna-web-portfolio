import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }

  return Response.json({ images });
}