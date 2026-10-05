import Link from "next/link";

// One entry per tile. To change a tile's image or label, edit it here.
const sections = [
  { href: "/gallery", label: "Gallery", image: "/front/gallery.png" },
  { href: "/about", label: "About", image: "/front/about.png" },
  { href: "/side-projects", label: "Side projects", image: "/front/side-projects.png" },
  { href: "/contact", label: "Contact", image: "/front/contact.png" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-600 mb-10">Anna Karlsson</h1>

      {/* grid-cols-2 = always two columns, which gives 2x2 with four tiles.
          max-w-3xl stops the grid from getting too large on wide screens. */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            {/* Lift effect: the tile moves up 4px and gets a stronger shadow on hover.
                Nothing is scaled, so no part of the image is ever clipped. */}
              <div className="overflow-hidden rounded-lg transition-all duration-300 group-hover:-translate-y-1">
                <img
                  src={section.image}
                  alt={section.label}
                  className="w-full aspect-[3/2] object-cover dark:invert"
                />
              </div>
            <p className="text-center text-gray-600 mt-3 text-lg">{section.label}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}