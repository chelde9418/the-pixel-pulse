import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { categories, getByCategory, type Category } from "@/data/articles";

export const Route = createFileRoute("/category/")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug as Category);
    if (!cat) throw notFound();
    return { cat, list: getByCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.label} — PixelReel` },
      { name: "description", content: loaderData?.cat.description ?? "" },
      { property: "og:title", content: `${loaderData?.cat.label} — PixelReel` },
      { property: "og:description", content: loaderData?.cat.description ?? "" },
      { property: "og:url", content: `/category/${loaderData?.cat.slug}` },
    ],
    links: [{ rel: "canonical", href: `/category/${loaderData?.cat.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">Catégorie introuvable</div>
  ),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, list } = Route.useLoaderData();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-widest text-primary">Catégorie</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">{cat.label}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">{cat.description}</p>
        </header>
        {list.length === 0 ? (
          <p className="text-muted-foreground">Aucun article pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {list.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
