import ResumePage from "@/components/pages/ResumePage";
import { getProfile, getResume } from "@/lib/api";

export default async function ResumeRoute() {
  const [resume, profile] = await Promise.all([getResume(), getProfile()]);
  return <ResumePage resume={resume} profile={profile} />;
}
