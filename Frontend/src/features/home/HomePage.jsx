"use client";

import Link from "next/link";
import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomeOverviewSection from "@/features/home/components/HomeOverviewSection";
import HomeStatusSection from "@/features/home/components/HomeStatusSection";
import HomeWorkflowSection from "@/features/home/components/HomeWorkflowSection";
import MagazinePage from "../magazine/MagazinePage";

function HomePage({ profile }) {
  return (
    <>
      <HomeHeroSection profile={profile} />

      <section className="px-6 pb-24 text-white">
        <div className="mx-auto max-w-7xl space-y-14">
          <HomeOverviewSection profile={profile} />
          <HomeWorkflowSection profile={profile} />
          <HomeStatusSection profile={profile} />

          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
            <Link
              href="/public-chat"
              className="rounded-xl border border-cyan-300/25 bg-cyan-400/10 p-4 transition hover:bg-cyan-400/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                Community
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Public Chat
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Join the live group chat and reply in threaded discussions.
              </p>
            </Link>

            <Link
              href="/qanda"
              className="rounded-xl border border-amber-300/25 bg-amber-400/10 p-4 transition hover:bg-amber-400/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
                Knowledge
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">Q&A Hub</h3>
              <p className="mt-2 text-sm text-slate-200">
                Ask coding questions and publish practical answers for others.
              </p>
            </Link>
          </section>

          <MagazinePage />
        </div>

        <div className="mx-auto max-w-7xl space-y-14 "></div>
      </section>
    </>
  );
}

export default HomePage;
