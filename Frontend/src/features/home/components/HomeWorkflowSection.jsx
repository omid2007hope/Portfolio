import Panel from "@/components/ui/Panel";
import {
  getHomeWorkflowDescription,
  getHomeWorkflowTitle,
} from "@/lib/site-content";

function HomeWorkflowSection({ profile }) {
  return (
    <Panel className="rounded-[2rem] p-8 shadow-[0_20px_80px_rgba(2,8,23,0.35)]">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {getHomeWorkflowTitle(profile)}
      </h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
        {getHomeWorkflowDescription(profile)}
      </p>
    </Panel>
  );
}

export default HomeWorkflowSection;
