import TagList from "@/components/ui/TagList";

function ResumeSkillsSection({ skillGroups = [] }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Skills</h2>
      {skillGroups.length ? (
        skillGroups.map((group) => (
          <div key={group.title} className="mb-8">
            <h4 className="text-sm font-semibold uppercase text-white/60">
              {group.title}
            </h4>
            <TagList
              items={group.items || []}
              className="mt-3"
              itemClassName="px-4 py-1 text-sm font-semibold"
            />
          </div>
        ))
      ) : (
        <p className="text-white/70">No skill groups added yet.</p>
      )}
    </section>
  );
}

export default ResumeSkillsSection;
