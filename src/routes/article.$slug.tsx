import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { AdSlot } from "@/components/AdSlot";
import { getArticle, getRelated } from "@/data/articles";
import { Clock, Calendar, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { a, related: getRelated(a) };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.a;
    return {
      meta: [
        { title: `${a?.title} — PixelReel` },
        { name: "description", content: a?.excerpt ?? "" },
        { property: "og:title", content: a?.title ?? "" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a?.cover ?? "" },
        { property: "og:url", content: `/article/${params.slug}` },
        { name: "twitter:image", content: a?.cover ?? "" },
      ],
      links: [{ rel: "canonical", href: `/article/${params.slug}` }],
      scripts: a
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              image: a.cover,
              datePublished: a.date,
              author: { "@type": "Person", name: a.author },
            }),
          }]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">Article introuvable</div>
  ),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  component: ArticlePage,
});

function renderMarkdown(md: string) {
  // tiny renderer: ## headings, **bold**, *italic*, paragraphs
  return md.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i} className="font-display text-2xl font-bold mt-10 mb-3">{block.slice(3)}</h2>;
    }
    const html = block
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    return <p key={i} className="leading-relaxed text-foreground/90 my-4" dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

function Comments() {
  const [list, setList] = useState<{ name: string; text: string; at: string }[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 60);
    const t = text.trim().slice(0, 1000);
    if (!n || !t) return;
    setList([{ name: n, text: t, at: new Date().toLocaleString("fr-FR") }, ...list]);
    setName(""); setText("");
  };
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold mb-6">Commentaires</h2>
      <form onSubmit={submit} className="space-y-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          maxLength={60}
          className="w-full h-10 px-3 rounded-md bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Votre commentaire..."
          rows={3}
          maxLength={1000}
          className="w-full p-3 rounded-md bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Publier</button>
      </form>
      <div className="space-y-4">
        {list.length === 0 && <p className="text-sm text-muted-foreground">Soyez le premier à commenter.</p>}
        {list.map((c, i) => (
          <div key={i} className="p-4 rounded-lg border border-border bg-card">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span className="font-medium text-foreground">{c.name}</span>
              <span>{c.at}</span>
            </div>
            <p className="text-sm">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArticlePage() {
  const { a, related } = Route.useLoaderData();
  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <Header />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 pt-12 pb-16">
          <Link to="/category/$slug" params={{ slug: a.category }} className="text-xs uppercase tracking-widest text-primary">
            {a.category}
          </Link>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{a.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{a.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><User className="w-3 h-3" /> {a.author}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(a.date).toLocaleDateString("fr-FR")}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readingMinutes} min de lecture</span>
          </div>
          <img src={a.cover} alt={a.title} loading="lazy" className="mt-8 w-full aspect-[16/9] object-cover rounded-xl" />
          <div className="mt-8 prose-invert">{renderMarkdown(a.content)}</div>
          <AdSlot />
          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Partager</p>
            <ShareButtons title={a.title} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">#{t}</span>
            ))}
          </div>
          <Comments />
        </article>

        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-16 border-t border-border">
            <h2 className="font-display text-2xl font-bold mb-8">À lire ensuite</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
