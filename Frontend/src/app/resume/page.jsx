import ResumePage from "@/components/features/resume/ResumePage";
import { getProfile, getResume } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";

export async function generateMetadata() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);
  const name = resume?.profileName || profile?.fullName || "Omid Teimory";

  return buildPageMetadata({
    profile,
    resume,
    title: `${name} Resume | Portfolio Prime`,
    path: "/resume",
    keywords: [
      "full-stack developer resume Austria",
      "frontend specialist CV Vienna",
      "React developer resume",
    ],
  });
}

export default async function ResumeRoute() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);
  const seo = getSeoProfile(profile, resume);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            resume,
            path: "/resume",
            title: `${resume?.profileName || profile?.fullName || "Omid Teimory"} Resume | Portfolio Prime`,
            description: seo.description,
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
