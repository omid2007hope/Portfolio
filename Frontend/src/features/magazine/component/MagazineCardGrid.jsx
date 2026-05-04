import Panel from "@/components/ui/Panel";

function MagazineCard({ item }) {
  return (
    <Panel className="group w-full overflow-hidden border-white/10 bg-white/4 p-0">
      {item.photo ? (
        <div className="aspect-16/10 overflow-hidden border-b border-white/10 bg-slate-900/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.photo}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-16/10 border-b border-white/10 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.2),transparent_40%),linear-gradient(160deg,rgba(15,23,42,0.95),rgba(3,7,18,0.95))]" />
      )}

      <article className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
          {item.displayDate || "Recent"}
        </p>
        <h3 className="text-xl font-semibold leading-7 text-white">
          {item.title}
        </h3>
        <p className="text-sm leading-7 text-slate-300">
          {item.description || "No description available for this entry."}
        </p>
      </article>
    </Panel>
  );
}

function MagazineCardGrid({ items }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <MagazineCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MagazineCardGrid;
