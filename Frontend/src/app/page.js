import HomePage from "@/components/pages/HomePage";
import { getProfile } from "@/lib/api";

export default async function Page() {
  const profile = await getProfile();
  return <HomePage profile={profile} />;
}
