import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error(error);
    return <p>Failed to load images.</p>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-500 text-center mb-8">
        Anna Karlsson
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col gap-2">
            <img
              src={image.url}
              alt={image.title || ""}
              className="w-full rounded-lg shadow object-cover aspect-square"
            />
            {image.title && (
              <p className="text-gray-600 font-medium">{image.title}</p>
            )}
            {image.description && (
              <p className="text-gray-400 text-sm">{image.description}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}