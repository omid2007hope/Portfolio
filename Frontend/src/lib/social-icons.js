import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Phone,
  X,
  Youtube,
} from "lucide-react";

function KickIcon({ className, size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M3 3h6v6h3V6h3V3h6v6h-3v3h-3v3h3v3h3v6h-6v-3h-3v-3H9v6H3V3z" />
    </svg>
  );
}

function ArtstationIcon({ className, size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M0 17.723l2.027 3.51h.001a2.424 2.424 0 0 0 2.164 1.334h12.535l-2.607-4.517H0zm24 0l-3.528-6.111-1.325 2.296 2.538 4.398L19.37 21.6h2.247a2.424 2.424 0 0 0 2.383-3.877zM9.544 3.738a2.425 2.425 0 0 0-4.183.007L.952 11.458h14.733L9.544 3.738z" />
    </svg>
  );
}

function CredlyIcon({ className, size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.18 13.3A5.94 5.94 0 0 1 12 16.8a6.3 6.3 0 1 1 6.3-6.3h-2.1A4.2 4.2 0 1 0 12 14.7a3.94 3.94 0 0 0 2.76-1.14z" />
    </svg>
  );
}

function WonderfulDevIcon({ className, size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 6l3 12 3-8 3 8 3-12" />
      <path d="M18 9l2 3-2 3" />
      <path d="M22 6v12" />
    </svg>
  );
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: X,
  twitter: X,
  youtube: Youtube,
  kick: KickIcon,
  instagram: Instagram,
  artstation: ArtstationIcon,
  credly: CredlyIcon,
  "wonderful.dev": WonderfulDevIcon,
  wonderful: WonderfulDevIcon,
  wonderfuldev: WonderfulDevIcon,
  "wonderful-dev": WonderfulDevIcon,
  mail: Mail,
  email: Mail,
  globe: Globe,
  link: LinkIcon,
  phone: Phone,
};

export const getSocialIcon = (iconKey) => {
  const normalized = String(iconKey || "").trim().toLowerCase();
  return iconMap[normalized] || Globe;
};

