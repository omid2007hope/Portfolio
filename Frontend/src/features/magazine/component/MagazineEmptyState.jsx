import Panel from "@/components/ui/Panel";

function MagazineEmptyState({ error }) {
  return (
    <Panel className="rounded-3xl border-dashed border-white/20 bg-white/3 p-10 text-center">
      <h3 className="text-xl font-semibold text-white">
        No Magazine Entries Yet
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-300">
        Upload your first magazine item and it will appear here automatically.
      </p>
      {error ? <p className="mt-3 text-sm text-rose-200/90">{error}</p> : null}
    </Panel>
  );
}

export default MagazineEmptyState;
