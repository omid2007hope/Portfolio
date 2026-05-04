import Panel from "@/components/ui/Panel";

function MagazineSkeletonGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <Panel
          key={item}
          className="overflow-hidden border-white/10 bg-white/4 p-0"
        >
          <div className="aspect-16/10 animate-pulse bg-white/10" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          </div>
        </Panel>
      ))}
    </div>
  );
}

export default MagazineSkeletonGrid;
