import { ExternalLink } from "lucide-react";
import { CardContent } from "~/components/ui/card";
import { Reference } from "~/lib/metadata";
import Link from "../Link";
import { Dictionary } from "~/config/dictionaries";

type GovernanceLinksProps = {
  links: Reference[];
  translations: Dictionary["pageGovernanceActionsDetails"];
};

export const GovernanceLinks = ({
  links,
  translations,
}: GovernanceLinksProps) => {
  return (
    <CardContent className="p-6">
      <h2 className="mb-4 text-lg font-medium dark:text-gray-100">
        {translations.supportingLinks}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.uri}
            className="group block p-4 border rounded-lg
              border-gray-200 hover:border-gray-300 hover:bg-gray-50
              dark:border-gray-700 dark:hover:border-gray-600
              dark:hover:bg-gray-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="mb-1 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {link.label}
                  <ExternalLink
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-500
                      dark:text-gray-500 dark:group-hover:text-gray-400"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-gray-500 dark:text-gray-400 text-sm break-all">
                  {link.uri}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CardContent>
  );
};
