function MagazineSectionHeader({ isLoading, contentCountLabel }) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
        Daily Magazine
      </p>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Latest Notes and Updates
        </h2>
        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-medium text-slate-200">
          {isLoading ? "Loading..." : contentCountLabel}
        </span>
      </div>
      <p className="max-w-3xl text-lg leading-8 text-slate-300">
        Short insights, experiments, and practical development notes from recent
        portfolio work.
      </p>
    </div>
  );
}

export default MagazineSectionHeader;
