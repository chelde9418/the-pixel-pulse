import { Link } from "@tanstack/react-router";
import { categories } from "@/data/articles";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="font-display font-bold text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> PixelReel
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Tech, films et séries. Critiques honnêtes, tests rigoureux, recommandations choisies.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Catégories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-foreground">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Newsletter</h4>
          <Newsletter compact />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} PixelReel. Tous droits réservés.</span>
          <span>Fait avec passion.</span>
        </div>
      </div>
    </footer>
  );
}
