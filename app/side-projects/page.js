import Link from "next/link";

export default function SideProjectsPage() {
  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
        ← Home
      </Link>
      <h1 className="text-4xl font-bold text-gray-500 text-center mb-8">About</h1>
      <p className="text-center text-gray-400">Coming soon.</p>
    </main>
  );
}