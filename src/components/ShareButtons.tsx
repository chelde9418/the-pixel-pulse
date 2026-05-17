import { useEffect, useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const e = encodeURIComponent;
  const t = e(title);
  const u = e(url);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "Twitter / X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: "TikTok", href: `https://www.tiktok.com/upload?lang=fr` },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
