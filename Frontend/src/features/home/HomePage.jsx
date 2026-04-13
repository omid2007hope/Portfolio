"use client";

import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomeOverviewSection from "@/features/home/components/HomeOverviewSection";
import HomeStatusSection from "@/features/home/components/HomeStatusSection";
import HomeWorkflowSection from "@/features/home/components/HomeWorkflowSection";

function HomePage({ profile }) {
  return (
    <>
      <HomeHeroSection profile={profile} />

      <section className="px-6 pb-24 text-white">
        <div className="mx-auto max-w-7xl space-y-14">
          <HomeOverviewSection profile={profile} />
          <HomeWorkflowSection profile={profile} />
          <HomeStatusSection profile={profile} />
        </div>
      </section>
    </>
  );
}

export default HomePage;
