import Link from "next/link";

// ---------- CONTENT: edit everything in this block ----------
const portrait = "/about/portrait.jpg"; // set to null to hide the portrait

// Each string becomes its own paragraph
const bio = [
  "First paragraph about Anna — who she is and what she makes.",
  "Second paragraph — materials, techniques, themes in the work.",
];

// The CV. Each section has a heading and a list of entries.
// - Sections with no entries are hidden automatically.
// - Add, remove, rename or reorder sections freely.
// - Use \n inside text for a manual line break (e.g. a long exhibition title).
const cv = [
  {
    heading: "Utbildning",
    entries: [
      { year: "2024–2026", text: "MFA i konsthantverk, textilkonst, HDK-Valand" },
      { year: "2021–2024", text: "BFA i konsthantverk, textilkonst, HDK-Valand" },
    ],
  },
  {
    heading: "Förberedande utbildning",
    entries: [
      { year: "2020–2021", text: "Munka Folkhögskola, Konst 2" },
      { year: "2019–2020", text: "Östra Grevie Folkhögskola, Konstgrafiklinjen" },
      { year: "2018–2019", text: "Östra Grevie Folkhögskola, Textil konst och design" },
      { year: "2017–2018", text: "Ölands Folkhögskola, Konst 1" },
    ],
  },
  {
    heading: "Separatutställningar",
    entries: [
      { year: "2024", text: "Galleri Klippan, Bohuslän" },
    ],
  },
  {
    heading: "Grupputställningar i urval",
    entries: [
      { year: "2026", text: "“HDK-Valand Craft c/o Rian”, samlingsutställning med masterarbete, Rian Designmuseum, Falkenberg" },
      { year: "2026", text: "“THIS WAY – MFA Craft Degree Show”, avgångsutställning masterexamen, Galleri Thomassen, Göteborg" },
      { year: "2025–2028", text: "“UNGVÄV – tradition i rörelse”, traveling exhibition, Sweden" },
      { year: "2025", text: "OUROBOROS, end of year exhibition, Galleri Box, Göteborg" },
      { year: "2024", text: "“KRAFT”, avgångsutställning kandidatexamen, Galleri Thomassen, Göteborg" },
      { year: "2024", text: "“Låt hundra blommor blomma”, Röhsska museet, Göteborg" },
    ],
  },
  {
    heading: "Artiklar, tidskrifter och intervjuer",
    entries: [
      { year: "2026", text: "“Graduation exhibitions 2026 Konstfack, HDK-Valand and Handarbetets Vänner”, VÄV Bookazine 2026, artikel" },
      {
        year: "2025",
        text: "“En ny generation tar plats i vävstolarna”, SVT, intervju",
        link: "https://www.svt.se/nyheter/lokalt/vast/en-ny-generation-tar-plats-i-vavstolarna-tar-upp-stafettpinnen",
      },
      {
        year: "2025",
        text: "“VGR leder satsning på unga som väver”, VGR Fokus",
        link: "https://vgrfokus.se/2025/09/vgr-leder-satsning-pa-unga-som-vaver/",
      },
      { year: "2024", text: "“Vävda världar”, Hemslöjd nr 6 2024 (Virka, virka!), artikel" },
    ],
  },
];
// ---------- END OF CONTENT ----------

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>

      {/* max-w-3xl keeps lines at a comfortable reading length */}
      <div className="max-w-3xl mx-auto mt-6">
        <h1 className="text-4xl font-bold text-gray-600 mb-10 text-center">About</h1>

        {/* Bio, with optional portrait beside it from tablet width up */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {portrait && (
            <img
              src={portrait}
              alt="Anna Karlsson"
              className="w-full md:w-1/3 object-cover"
            />
          )}
          <div className="flex flex-col gap-4 flex-1">
            {bio.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* CV: one block per section that has at least one entry */}
        <div className="mt-14 flex flex-col gap-10">
          {cv
            .filter((section) => section.entries.length > 0) // hide empty sections
            .map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-gray-600 mb-3">
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-2">
                  {section.entries.map((entry, i) => (
                    <li key={i} className="flex gap-6 text-gray-600">
                      {/* Year column:
                          w-24 = fixed width, so all entries line up.
                          flex-shrink-0 = never squeezed narrower on small screens.
                          tabular-nums = all digits equal width, so years align exactly. */}
                      <span className="w-24 flex-shrink-0 text-gray-400 tabular-nums">
                        {entry.year}
                      </span>
                      {/* Entry text:
                          because it's a separate column, wrapped lines automatically
                          align under the text, not under the year.
                          whitespace-pre-line = respects \n line breaks in the text. */}
                      {/* If the entry has a link, the text becomes a link that opens in a new tab.
                      Otherwise it's shown as plain text. */}
                  <span className="whitespace-pre-line">
                    {entry.link ? (
                      <a href={entry.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">{entry.text}</a>
                    ) : (
                      entry.text
                    )}
                  </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </main>
  );
}