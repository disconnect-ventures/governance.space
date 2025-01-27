import { AlertCircleIcon } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gray-200 text-center px-2 md:px-4 py-1">
      <div className="w-fit"></div>
      <span className="text-sm">
        <AlertCircleIcon className="h-4 w-4 text-yellow-600 inline mr-2" />
        This site is under development and will officially launch on January
        29th at 21:30 UTC
      </span>
    </div>
  );
}
