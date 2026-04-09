import Panel from "@/components/ui/Panel";
import {
  getHomeInfoCards,
  getHomeSectionDescription,
  getHomeSectionEyebrow,
  getHomeSectionItems,
  getHomeSectionTitle,
} from "@/lib/site-content";

function HomeOverviewSection({ profile }) {
  const homeInfoCards = getHomeInfoCards(profile);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
          {getHomeSectionEyebrow(profile)}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {getHomeSectionTitle(profile)}
        </h2>
        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          {getHomeSectionDescription(profile)}
        </p>
        <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-base leading-7 text-slate-200">
          {getHomeSectionItems(profile).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {homeInfoCards.map((card) => (
          <Panel key={card.title} className="p-5 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

export default HomeOverviewSection;
