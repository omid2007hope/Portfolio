import { Github, Globe, Linkedin, Mail, Link as LinkIcon, Phone, X } from "lucide-react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: X,
  twitter: X,
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
