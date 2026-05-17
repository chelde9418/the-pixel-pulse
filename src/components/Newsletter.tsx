import { useState } from "react";
import { z } from "zod";

const schema = z.object({ email: z.string().trim().email("Email invalide").max(255) });

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ email });
    if (!r.success) {
      setStatus("err");
      setMsg(r.error.issues[0].message);
      return;
    }
    setStatus("ok");
    setMsg("Merci ! Vérifiez votre boîte mail.");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className={compact ? "space-y-2" : "max-w-md mx-auto space-y-3"}>
      {!compact && (
        <p className="text-sm text-muted-foreground text-center">
          Une sélection hebdo, zéro spam.
        </p>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="flex-1 h-10 px-3 rounded-md bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          maxLength={255}
        />
        <button
          type="submit"
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          S'inscrire
        </button>
      </div>
      {status !== "idle" && (
        <p className={`text-xs ${status === "ok" ? "text-primary" : "text-destructive"}`}>{msg}</p>
      )}
    </form>
  );
}
