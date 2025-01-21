import { ExternalLink } from "lucide-react";
import { CardContent } from "~/components/ui/card";

type SupportLink = {
  title: string;
  url: string;
};

type GovernanceLinksProps = {
  links: SupportLink[];
};

export const GovernanceLinks = ({ links }: GovernanceLinksProps) => {
  return (
    <CardContent className="p-6">
      <h2 className="mb-4 text-lg font-medium">Supporting links</h2>

      <div className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="group block p-4 border rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="mb-1 font-medium text-gray-900 flex items-center gap-2">
                  {link.title}
                  <ExternalLink
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-gray-500 text-sm break-all">
                  {link.url}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </CardContent>
  );
};
