import AboutPage from "@/components/pages/AboutPage";
import { getProfile } from "@/lib/api";

export default async function AboutRoute() {
  const profile = await getProfile();
  return <AboutPage profile={profile} />;
}
