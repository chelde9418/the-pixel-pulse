export function AdSlot({ label = "Publicité" }: { label?: string }) {
  return (
    <div className="my-8 rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground text-xs text-center py-8">
      {label} — emplacement Google AdSense
    </div>
  );
}
