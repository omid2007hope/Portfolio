"use client";

import { useState } from "react";
import HomeChatLauncher from "@/features/home/components/HomeChatLauncher";
import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomeOverviewSection from "@/features/home/components/HomeOverviewSection";
import HomeStatusSection from "@/features/home/components/HomeStatusSection";
import HomeWorkflowSection from "@/features/home/components/HomeWorkflowSection";

function HomePage({ profile }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HomeHeroSection profile={profile} />

      <section className="px-6 pb-24 text-white">
        <div className="mx-auto max-w-7xl space-y-14">
          <HomeOverviewSection profile={profile} />
          <HomeWorkflowSection profile={profile} />
          <HomeStatusSection profile={profile} />
        </div>

        <HomeChatLauncher open={open} setOpen={setOpen} />
      </section>
    </>
  );
}

export default HomePage;
