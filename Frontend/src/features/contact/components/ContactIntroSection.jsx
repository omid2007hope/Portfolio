import Panel from "@/components/ui/Panel";
import {
  getContactIntroDescription,
  getContactIntroEyebrow,
  getContactIntroTitle,
} from "@/lib/site-content";

function ContactIntroSection({ profile }) {
  return (
    <Panel className="mb-12 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
        {getContactIntroEyebrow(profile)}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">
        {getContactIntroTitle(profile)}
      </h2>
      <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/75">
        {getContactIntroDescription(profile)}
      </p>
    </Panel>
  );
}

export default ContactIntroSection;
