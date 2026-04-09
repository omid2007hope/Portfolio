import Panel from "@/components/ui/Panel";
import {
  getHomeStatusDescription,
  getHomeStatusTitle,
} from "@/lib/site-content";

function HomeStatusSection({ profile }) {
  return (
    <Panel className="rounded-[2rem] border-emerald-400/20 bg-emerald-400/10 p-8 shadow-[0_20px_80px_rgba(2,8,23,0.25)]">
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100/80">
        {getHomeStatusTitle(profile)}
      </h3>
      <p className="mt-4 max-w-4xl text-lg leading-8 text-emerald-50">
        {getHomeStatusDescription(profile)}
      </p>
    </Panel>
  );
}

export default HomeStatusSection;
