import Link from "next/link";

// ---------- CONTENT: edit everything in this block ----------
const contact = {
  name: "Anna Karlsson",
  // Address lines, shown one per line. Remove any you don't want public.
  lines: ["Studio name", "Street address", "Postcode City", "Sweden"],
  email: "anna@example.com",
  instagram: "annakarlssonart", // handle without the @, or null to hide
};
const image = "/contact/contact.jpg"; // file in public/contact/, or null for no image
// ---------- END OF CONTENT ----------

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>

      <div className="max-w-4xl mx-auto mt-6">
        <h1 className="text-4xl font-bold text-gray-600 mb-10 text-center">Contact</h1>

        {/* Stacked on phones, side by side from tablet width up */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Contact details */}
          <div className="flex flex-col gap-1 md:w-1/2 text-gray-600">
            <p className="font-medium">{contact.name}</p>
            {contact.lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}

            {/* mailto: opens the visitor's email program with the address filled in */}
            <a href={`mailto:${contact.email}`} className="mt-4 underline hover:text-gray-400">{contact.email}</a>

            {/* target="_blank" opens Instagram in a new tab.
                rel="noopener noreferrer" stops that new tab from accessing this page —
                a standard security precaution for links that open new tabs. */}
            {contact.instagram && (
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">@{contact.instagram}</a>
            )}
          </div>

          {/* Optional image, hidden entirely if image is null */}
          {image && (
            <img src={image} alt="" className="w-full md:w-1/2 rounded-lg object-cover" />
          )}
        </div>
      </div>
    </main>
  );
}