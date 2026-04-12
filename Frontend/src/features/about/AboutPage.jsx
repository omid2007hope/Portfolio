import PageSection from "@/components/layout/PageSection";
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
    <PageSection>
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
    </PageSection>
  );
}

export default AboutPage;
