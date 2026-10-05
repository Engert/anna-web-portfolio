import Link from "next/link"; // Next.js navigation component (switches pages without a full reload)
import { supabase } from "@/lib/supabase";
import Gallery from "@/app/components/Gallery";

export default async function GalleryPage() {
  // Fetch main images, with their detail images attached to each one
  const { data: images, error } = await supabase
    .from("images")
    .select("*, detail_images(*)")
    .order("order_index", { ascending: true })
    .order("id", { ascending: true }); // tiebreaker if two images share an order_index

  if (error) {
    console.error(error);
    return <p>Failed to load images.</p>;
  }

  return (
    <main className="min-h-screen p-8">
      {/* Link back to the front page */}
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>
      <h1 className="text-4xl font-bold text-gray-500 text-center mb-8">
        Gallery
      </h1>
      <Gallery images={images} />
    </main>
  );
}