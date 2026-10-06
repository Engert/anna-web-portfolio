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
    <main className="min-h-screen flex flex-col items-center px-8 pb-8">
      {/* Header area.
          min-h-[33vh] = at least 33% of the screen height (vh = viewport height).
          items-end = the banner sits at the bottom of this area, just above the tiles.
          To push the tiles further down, raise 33vh (e.g. 40vh). */}
      <header className="min-h-[30vh] w-full flex items-start justify-center pt-[8vh]">
        {/* The banner image sits inside the h1, so the page still has a proper main heading.
            The alt text is what search engines and screen readers see. */}
        <h1 className="w-full flex justify-center">
          <img
            src="/banner.png"
            alt="Anna Karlsson"
            // max-w-md caps the banner at ~450px wide; w-full lets it shrink on phones.
            // dark:invert turns black lettering white in dark mode (remove if the banner is coloured).
            className="w-full max-w-3xl h-auto dark:invert"
          />
        </h1>
      </header>

      {/* grid-cols-2 = two columns, which gives 2x2 with four tiles. */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-[min(64rem,calc(90vh_-_200px))]">
        {sections.map((section) => (
          // "group" lets the child elements react when this whole link is hovered
          <Link key={section.href} href={section.href} className="group">
            {/* Lift effect: on hover the tile moves up 4px */}
            <div className="overflow-hidden rounded-lg transition-all duration-300 group-hover:-translate-y-1">
              <img
                src={section.image}
                alt={section.label}
                // aspect-[3/2] = 3 wide by 2 high; object-cover fills the frame without distorting
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