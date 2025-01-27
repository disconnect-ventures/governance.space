import Link from "next/link";
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
        { title: "Constitution Committee Portal", path: "https://constitution.gov.tools/en" },
        { title: "Interim Constitution", path: "https://constitution.gov.tools/en/interim-constitution" },
      ],
    },
  ];

  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Logo and Built on section */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-semibold text-xl">
                <Logo />
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Cardano Voltaire CIP-1694 Offical Transparency & Community Portal.
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mt-2">Built on</span>
              <span className="font-bold text-blue-600">CARDANO</span>
            </div>
          </div>

          {/* Menu sections */}
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

        {/* Bottom section */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>© 2024 Governance Space</div>
          <div className="flex space-x-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-use">Terms of Use</Link>
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
