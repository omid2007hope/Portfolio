import Panel from "@/components/ui/Panel";
import {
  getAboutProcessDescription,
  getAboutProcessEyebrow,
  getAboutProcessTitle,
  getAboutSectionTitle,
} from "@/lib/site-content";

function AboutOverview({ profile, aboutParagraphs = [] }) {
  return (
    <Panel className="space-y-10 p-8 lg:col-span-2">
      <section>
        <h2 className="text-2xl font-extrabold leading-snug">
          {getAboutSectionTitle(profile)}
        </h2>

        {aboutParagraphs.map((paragraph, index) => (
          <p
            key={`${paragraph.content}-${index}`}
            className="mt-5 text-lg leading-relaxed text-white/80"
          >
            {paragraph.content}
          </p>
        ))}
      </section>

      <section className="border-t border-white/10 pt-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
          {getAboutProcessEyebrow(profile)}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold leading-snug">
          {getAboutProcessTitle(profile)}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/80">
          {getAboutProcessDescription(profile)}
        </p>
      </section>
    </Panel>
  );
}

export default AboutOverview;
