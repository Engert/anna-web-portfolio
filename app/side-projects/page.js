import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Gallery from "@/app/components/Gallery";

export default async function SideProjectsPage() {
  // Same as the gallery page, but filtered to side-projects
  const { data: images, error } = await supabase
    .from("images")
    .select("*, detail_images(*)")
    .eq("category", "side-projects")
    .order("order_index", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return <p>Failed to load images.</p>;
  }

  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>
      <h1 className="text-4xl font-bold text-gray-500 text-center mb-8">
        Side projects
      </h1>
      {/* Reuses the same Gallery component, so it gets the masonry grid and lightbox for free */}
      <Gallery images={images} />
    </main>
  );
}