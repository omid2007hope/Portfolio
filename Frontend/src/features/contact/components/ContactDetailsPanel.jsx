import { Mail, MapPin, Phone } from "lucide-react";
import Panel from "@/components/ui/Panel";
import { getSocialIcon } from "@/lib/social-icons";
import {
  getContactPanelDescription,
  getContactPanelTitle,
  getSocialLinks,
} from "@/lib/site-content";

function ContactDetailsPanel({ profile }) {
  const socialLinks = getSocialLinks(profile);

  return (
    <Panel className="h-fit w-full space-y-6 p-6">
      <h2 className="text-xl font-bold">{getContactPanelTitle(profile)}</h2>
      <p className="text-sm leading-relaxed text-white/70">
        {getContactPanelDescription(profile)}
      </p>

      <ContactDetail
        icon={Mail}
        label="Email"
        value={profile?.email || "omidhope2007@gmail.com"}
      />
      <ContactDetail
        icon={Phone}
        label="Phone Number"
        value={profile?.phoneNumber || "+43 681-81580180"}
      />
      <ContactDetail
        icon={MapPin}
        label="Address"
        value={profile?.address || "Vienna, Austria"}
      />

      <hr className="border-white/10" />

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
          Find me on
        </h3>

        <div className="flex gap-4">
          {socialLinks.map((item) => {
            const Icon = getSocialIcon(item.iconKey);

            return (
              <a
                key={`${item.name}-${item.url}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                aria-label={`${item.name} profile`}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

function ContactDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-white/60">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default ContactDetailsPanel;
