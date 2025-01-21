import { FileText, Link } from "lucide-react";
import { CardContent } from "~/components/ui/card";

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
      <h2 className="mb-4 text-lg font-medium">Related documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.href}
            className="group flex items-center gap-4 p-4 border rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-700 truncate">
                {doc.fileName}
              </p>
              <span className="text-gray-400">{doc.fileType}</span>
            </div>
            <Link
              className="text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </CardContent>
  );
};
