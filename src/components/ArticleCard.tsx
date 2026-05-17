import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { Article } from "@/data/articles";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block animate-fade-up"
    >
      <article className="overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <img
            src={article.cover}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded">
            {article.category}
          </span>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className={`font-display font-semibold leading-tight group-hover:text-primary transition ${large ? "text-2xl" : "text-lg"}`}>
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingMinutes} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
