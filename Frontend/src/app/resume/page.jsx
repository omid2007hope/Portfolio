import ResumePage from "@/components/pages/ResumePage";
import { getProfile, getResume } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

export async function generateMetadata() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);
  const name = resume?.profileName || profile?.fullName || "Omid Teimory";

  return buildPageMetadata({
    profile,
    resume,
    title: `${name} Resume | Portfolio Prime`,
    description:
      resume?.summary ||
      profile?.shortBio ||
      "Review the resume of Omid Teimory, a frontend developer in Vienna, Austria specializing in Next.js and React.",
    path: "/resume",
    keywords: [
      "frontend developer resume Austria",
      "Next.js developer CV Vienna",
      "React developer resume",
    ],
  });
}

export default async function ResumeRoute() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            resume,
            path: "/resume",
            title: `${resume?.profileName || profile?.fullName || "Omid Teimory"} Resume | Portfolio Prime`,
            description:
              resume?.summary ||
              profile?.shortBio ||
              "Professional resume and experience summary for Omid Teimory.",
            type: "ProfilePage",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Resume", path: "/resume" },
            ],
            profile,
          ),
        ]}
      />
      <ResumePage resume={resume} profile={profile} />
    </>
  );
}
