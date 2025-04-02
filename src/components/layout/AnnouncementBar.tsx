import { AlertCircleIcon, ExternalLinkIcon } from "lucide-react";
import Link from "../features/Link";
import { Dictionary } from "~/config/dictionaries";

type AnnouncementBarProps = {
  translations: Dictionary["announcementBar"];
};

export function AnnouncementBar({ translations }: AnnouncementBarProps) {
  return (
    <div className="bg-blue-200 dark:bg-blue-900 text-foreground text-center px-2 md:px-4 py-1">
      <div className="w-fit"></div>
      <span className="text-sm">
        <AlertCircleIcon className="h-4 w-4 text-yellow-600 inline mr-2" />
        <Link
          href="https://forms.gle/M3ERb3WyiX7emoJD7"
          target="_blank"
          className="inline-flex gap-2 items-center hover:underline underline-offset-4"
        >
          {translations.feedbackText}
          <ExternalLinkIcon className="h-4 w-4 inline" />
        </Link>
      </span>
    </div>
  );
}
