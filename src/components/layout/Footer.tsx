import Image from "next/image";
import Link from "~/components/features/Link";
import { Twitter } from "lucide-react";
import CardanoLogo from "../../../public/assets/cardano-logo.svg";
import Logo from "~/components/icons/Logo";
import LocaleSwitch from "../features/LocaleSwitch";
import { ThemeSwitcher } from "../features/ThemeSwitch";

export type MenuSection = {
  title: string;
  links: Array<{
    title: string;
    path: string;
    newTab?: boolean;
  }>;
};

export function Footer() {
  const menu: MenuSection[] = [
    {
      title: "EXPLORE",
      links: [
        { title: "DReps", path: "/dreps" },
        { title: "Governance Actions", path: "/governance" },
        { title: "Proposals", path: "/proposals" },
        { title: "Committee Members", path: "/committees" },
      ],
    },
    {
      title: "GOVERNANCE",
      links: [
        { title: "Live Events", path: "/live-events" },
        { title: "Analytics", path: "/analytics" },
        { title: "Help", path: "/help" },
        { title: "About", path: "/about" },
      ],
    },
    {
      title: "LINKS",
      links: [
        { title: "Intersect", path: "https://intersectmbo.org/" },
        { title: "Cardano", path: "https://cardano.org/" },
        {
          title: "Const. Committee Portal",
          path: "https://constitution.gov.tools/en",
        },
        {
          title: "Interim Constitution",
          path: "https://constitution.gov.tools/en/interim-constitution",
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
                <div className="p-2 bg-muted rounded-sm hover:bg-muted/80 transition-colors">
                  <Link href="https://x.com/governancevote" target="_blank">
                    <Twitter className="text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              <p>All-in-One Governance Platform.</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Built on:</span>
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
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
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
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <LocaleSwitch />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
