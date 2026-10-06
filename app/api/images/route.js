import { supabase } from "@/lib/supabase";

export async function GET(request) {
  // Read ?category=... from the URL, e.g. /api/images?category=side-projects
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // Build the query step by step
  let query = supabase.from("images").select("*, detail_images(*)");

  // Only filter if a category was given; otherwise return all images
  if (category) {
    query = query.eq("category", category);
  }

  const { data: images, error } = await query
    .order("order_index", { ascending: true })
    .order("id", { ascending: true }); // tiebreaker

  if (error) {
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }

  return Response.json({ images });
}