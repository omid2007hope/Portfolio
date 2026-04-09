import SiteFooter from "@/components/layout/SiteFooter";
import AboutOverview from "@/features/about/components/AboutOverview";
import AboutSidebar from "@/features/about/components/AboutSidebar";
import {
  getAboutCards,
  getAboutIntroDescription,
  getAboutParagraphs,
  getDisplayName,
} from "@/lib/site-content";

function AboutPage({ profile }) {
  const displayName = getDisplayName(profile);
  const aboutParagraphs = getAboutParagraphs(profile);
  const aboutCards = getAboutCards(profile);

  return (
    <section className="flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white">
      <div className="flex w-full max-w-6xl flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold">About {displayName}</h1>
          <p className="mt-2 text-lg text-white/70">
            {getAboutIntroDescription(profile)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <AboutSidebar profile={profile} aboutCards={aboutCards} />
          <AboutOverview profile={profile} aboutParagraphs={aboutParagraphs} />
        </div>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default AboutPage;
