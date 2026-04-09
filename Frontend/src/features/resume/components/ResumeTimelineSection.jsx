import { Book } from "lucide-react";

function ResumeTimelineSection({
  title,
  entries = [],
  compact = false,
  emptyText,
}) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      {entries.length ? (
        entries.map((entry) => (
          <ResumeEntry
            key={`${entry.title}-${entry.period}`}
            entry={entry}
            compact={compact}
          />
        ))
      ) : (
        <p className="text-white/70">{emptyText}</p>
      )}
    </section>
  );
}

function ResumeEntry({ entry, compact }) {
  return (
    <div className="mb-10 flex gap-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
        <Book />
      </div>

      <div>
        <h3 className="text-lg font-bold">{entry.title}</h3>
        {(entry.period || entry.location || entry.subtitle) && (
          <p className="text-sm text-white/60">
            {[entry.subtitle, entry.period, entry.location]
              .filter(Boolean)
              .join(" - ")}
          </p>
        )}

        {entry.description ? (
          <p className="mt-2 max-w-2xl text-white/80">{entry.description}</p>
        ) : null}

        {entry.bullets?.length ? (
          <ul
            className={`mt-3 list-disc space-y-1 text-white/80 ${
              compact ? "ml-5" : "ml-6"
            }`}
          >
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default ResumeTimelineSection;
