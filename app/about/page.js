import Link from "next/link";

// ---------- CONTENT: edit everything in this block ----------
const portrait = "/about/portrait.jpg"; // image file in public/about/

// Each string becomes its own paragraph
const bio = [
  "First paragraph about Anna — who she is and what she makes.",
  "Second paragraph — materials, techniques, themes in the work.",
];

// Newest first. Add or remove lines freely.
const exhibitions = [
  { year: "2025", title: "Exhibition name", place: "Gallery, City" },
  { year: "2023", title: "Exhibition name", place: "Gallery, City" },
];
// ---------- END OF CONTENT ----------

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>

      {/* max-w-4xl keeps text lines a comfortable reading length */}
      <div className="max-w-4xl mx-auto mt-6">
        <h1 className="text-4xl font-bold text-gray-600 mb-10 text-center">About</h1>

        {/* flex-col = stacked on phones; md:flex-row = side by side from tablet width up */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Portrait — w-full on phones, fixed one-third width on larger screens */}
          <img
            src={portrait}
            alt="Anna Karlsson"
            className="w-full md:w-1/3 rounded-lg shadow object-cover"
          />

          {/* Bio — one <p> per string in the bio array */}
          <div className="flex flex-col gap-4 md:w-2/3">
            {bio.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Exhibitions — hidden entirely if the list is empty */}
        {exhibitions.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Exhibitions</h2>
            <ul className="flex flex-col gap-2">
              {exhibitions.map((ex, i) => (
                <li key={i} className="flex gap-6 text-gray-600">
                  {/* Fixed-width year column so titles line up vertically */}
                  <span className="w-12 flex-shrink-0 text-gray-400">{ex.year}</span>
                  <span>
                    {ex.title}
                    <span className="text-gray-400"> — {ex.place}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}