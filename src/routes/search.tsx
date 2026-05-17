import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import { Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Recherche — PixelReel" },
      { name: "description", content: "Rechercher des articles tech, films et séries." },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.excerpt.toLowerCase().includes(s) ||
        a.tags.some((t) => t.toLowerCase().includes(s)) ||
        a.category.includes(s),
    );
  }, [q]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full">
        <h1 className="font-display text-4xl font-bold">Rechercher</h1>
        <div className="mt-6 relative max-w-xl">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Smartphone, Dune, Netflix..."
            maxLength={120}
            className="w-full h-12 pl-10 pr-3 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{results.length} résultat{results.length > 1 ? "s" : ""}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {results.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}
