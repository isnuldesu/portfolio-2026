import {
  Envelope,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

const marks = {
  siGithub: GithubLogo,
  siLinkedin: LinkedinLogo,
  siX: XLogo,
  siInstagram: InstagramLogo,
  siWhatsapp: WhatsappLogo,
  mail: Envelope,
} as const;

export type BrandIconName = keyof typeof marks;

/** Phosphor at regular weight, so the marks match every other icon. */
export function BrandIcon({
  name,
  className,
}: {
  name: BrandIconName;
  className?: string;
}) {
  const Icon = marks[name];
  return <Icon weight="regular" className={cn("size-4", className)} />;
}
