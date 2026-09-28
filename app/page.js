import { supabase } from "@/lib/supabase";
import Gallery from "./components/Gallery";

export default async function Home() {
  const { data: images, error } = await supabase
    .from("images")
    .select("*, detail_images(*)")
    .order("order_index", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return <p>Failed to load images.</p>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-500 text-center mb-8">
        Anna Karlsson
      </h1>
      <Gallery images={images} />
    </main>
  );
}