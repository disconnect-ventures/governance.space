import Image from "next/image";
import Link from "~/components/features/Link";
import { Twitter } from "lucide-react";
import CardanoLogo from "../../../public/assets/cardano-logo.svg";
import Logo from "~/components/icons/Logo";
import LocaleSwitch from "../features/LocaleSwitch";
import { ThemeSwitcher } from "../features/ThemeSwitch";
import { Dictionary } from "~/config/dictionaries";

export type MenuSection = {
  title: string;
  links: Array<{
    title: string;
    path: string;
    newTab?: boolean;
  }>;
};

export type FooterProps = {
  translations: Dictionary["footer"];
};

export const Footer = ({ translations }: FooterProps) => {
  const menu: MenuSection[] = [
    {
      title: translations.titleExplore,
      links: [
        { title: translations.linkDreps, path: "/dreps" },
        { title: translations.linkGovernanceActions, path: "/governance" },
        { title: translations.linkProposals, path: "/proposals" },
        { title: translations.linkCommittees, path: "/committees" },
      ],
    },
    {
      title: translations.titleGovernance,
      links: [
        { title: translations.linkLiveEvents, path: "/live-events" },
        { title: translations.linkAnalytics, path: "/analytics" },
        { title: translations.linkHelp, path: "/help" },
        { title: translations.linkAbout, path: "/about" },
      ],
    },
    {
      title: translations.titleLinks,
      links: [
        {
          title: translations.linkIntersect,
          path: "https://intersectmbo.org/",
        },
        { title: translations.linkCardano, path: "https://cardano.org/" },
        {
          title: translations.linkCommitteePortal,
          path: "https://constitution.gov.tools/en",
        },
        {
          title: translations.linkInterimConstitution,
          path: "https://constitution.gov.tools/en/constitution",
        },
      ],
    },
  ];

  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Logo and Info Section */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-semibold text-xl">
                <Logo />
              </span>
              <div>
                <div className="p-2 bg-muted rounded-sm hover:bg-muted/80">
                  <Link href="https://x.com/governancevote" target="_blank">
                    <Twitter className="text-muted-foreground hover:text-foreground" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              <p>{translations.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">
                {translations.builtOn} :
              </span>
              <Link
                href="https://cardano.org/"
                target="_blank"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={CardanoLogo}
                  alt="Cardano's logo"
                  width={140}
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="mt-1">
              <Link
                href="mailto:hello@governancespace.com"
                className="text-sm text-muted-foreground hover:text-foreground "
              >
                hello@governancespace.com
              </Link>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {menu.map(({ title, links }, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="font-semibold mb-4 text-foreground">{title}</h4>
                <ul className="space-y-2">
                  {links.map(({ title, path, newTab }, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={path}
                        target={newTab ? "_blank" : undefined}
                        className="text-muted-foreground hover:text-foreground "
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-4 border-t border-border flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© 2025 Governance Space</div>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground ">
              {translations.privacyPolicy}
            </Link>
            <Link href="/terms" className="hover:text-foreground ">
              {translations.termsOfUse}
            </Link>
            <Link href="/cookie-policy" className="hover:text-foreground ">
              {translations.cookiePolicy}
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <LocaleSwitch />
            <ThemeSwitcher translations={translations} />
          </div>
        </div>
      </div>
    </footer>
  );
};
