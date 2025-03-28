import { FileText } from "lucide-react";
import ComingSoon from "~/components/layout/ComingSoon";
import { CardContent } from "~/components/ui/card";
import Link from "../Link";
import { ExternalLink } from "lucide-react";

type Document = {
  fileName: string;
  fileType: string;
  href: string;
};

type GovernanceDocumentsProps = {
  documents: Document[];
};

export const GovernanceDocuments = ({
  documents,
}: GovernanceDocumentsProps) => {
  return (
    <CardContent className="p-6">
      <h2 className="mb-4 text-lg font-medium dark:text-gray-100">
        Related documents
      </h2>
      <ComingSoon>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <Link
              key={index}
              href={doc.href}
              className="group flex items-center gap-4 p-4 border rounded-lg
                border-gray-200 hover:border-gray-300 hover:bg-gray-50
                dark:border-gray-700 dark:hover:border-gray-600
                dark:hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText
                className="w-8 h-8 text-gray-400 group-hover:text-gray-500
                dark:text-gray-500 dark:group-hover:text-gray-400"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-700 dark:text-gray-200 truncate">
                  {doc.fileName}
                </p>
                <span className="text-gray-400 dark:text-gray-500">
                  {doc.fileType}
                </span>
              </div>
              <ExternalLink
                className="text-gray-400 group-hover:text-gray-500
                  dark:text-gray-500 dark:group-hover:text-gray-400"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </ComingSoon>
    </CardContent>
  );
};
