import ContactPage from "@/components/pages/ContactPage";
import { getProfile } from "@/lib/api";

export default async function ContactRoute() {
  const profile = await getProfile();
  return <ContactPage profile={profile} />;
}
