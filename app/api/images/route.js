import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("order_index", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }

  return Response.json({ images });
}