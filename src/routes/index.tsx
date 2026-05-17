import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { articles, categories } from "@/data/articles";
import { ArrowRight, Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PixelReel — Tech, Films & Séries" },
      { name: "description", content: "Tests tech, critiques de films et top séries. Une sélection éditoriale, sans complaisance." },
      { property: "og:title", content: "PixelReel — Tech, Films & Séries" },
      { property: "og:description", content: "Tests tech, critiques de films et top séries." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = articles.filter((a) => a.featured);
  const recent = articles.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">
              <Flame className="w-3 h-3" /> Nouveau cette semaine
            </span>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
              La tech et la pop culture, <span className="text-primary">décryptées sans détour</span>.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Tests honnêtes, critiques argumentées et recommandations choisies. Le meilleur de la tech, des films et des séries.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/category/$slug"
                params={{ slug: "tech" }}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition glow"
              >
                Explorer la Tech <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/category/$slug"
                params={{ slug: "films" }}
                className="inline-flex items-center h-11 px-5 rounded-md border border-border text-sm font-medium hover:border-primary transition"
              >
                Critiques Films
              </Link>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">En vedette</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((a) => <ArticleCard key={a.slug} article={a} large />)}
          </div>
        </section>

        {/* Categories strip */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Catégorie</p>
                <p className="mt-1 font-display text-lg font-semibold group-hover:text-primary transition">{c.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Articles récents</h2>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-primary">
              Tout voir →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recent.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>

        {/* Trends */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Tendances</h2>
            <p className="text-muted-foreground text-sm mb-6">Ce dont tout le monde parle en ce moment.</p>
            <div className="flex flex-wrap gap-2">
              {["iPhone 16", "Dune 2", "Shōgun", "Apple Intelligence", "Ripley", "Pixel 9", "Avatar 3", "Vision Pro"].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">Restez branché</h2>
            <p className="mt-2 text-muted-foreground text-sm">Une newsletter par semaine, soigneusement éditée.</p>
            <div className="mt-6"><Newsletter /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
