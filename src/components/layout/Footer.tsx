import Image from "next/image";
import Link from "next/link";
import { Twitter } from "lucide-react";

import CardanoLogo from "../../../public/cardano-logo.svg";
import Logo from "~/components/icons/Logo";

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
          title: "Constitution Committee Portal",
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
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Logo and Built on section */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-semibold text-xl">
                <Logo />
              </span>
              <div>
                <div className="p-2 bg-gray-100 rounded-sm">
                  <Link href="https://x.com/governancevote" target="_blank">
                    <Twitter />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Cardano Voltaire CIP-1694 Offical Transparency & Community Portal.
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Built on:</span>
              <Link href="https://cardano.org/" target="_blank">
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
                className="text-sm text-gray-600"
              >
                hello@governancespace.com
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {menu.map(({ title, links }, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map(({ title, path }, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={path}
                        className="text-gray-600 hover:text-gray-900"
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

        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>© 2024 Governance Space</div>
          <div className="flex space-x-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <div className="flex items-center space-x-2">
            <span>Language & region:</span>
            <select className="bg-transparent">
              <option>English (US)</option>
            </select>
            <button className="p-2">Light mode</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
