import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { categories } from "@/data/articles";

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary glow" />
          PixelReel
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            className="p-2 rounded-md hover:bg-secondary transition"
            aria-label="Rechercher"
          >
            <Search className="w-4 h-4" />
          </Link>
          <button
            onClick={toggle}
            className="p-2 rounded-md hover:bg-secondary transition"
            aria-label="Changer de thème"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
