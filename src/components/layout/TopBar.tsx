import clsx from "clsx";
import { BackButton } from "./BackButton";
import {
  Twitter,
  Facebook,
  Linkedin,
  Bookmark,
  MoreVertical,
  LinkIcon,
} from "lucide-react";

type TopBarProps = {
  backHref?: string;
};

export function TopBar({ backHref }: TopBarProps) {
  const baseIconClasses = "w-4 h-4 inline cursor-pointer";
  return (
    <div className="flex justify-between gap-8">
      <BackButton href={backHref} />
      <div className="flex gap-8">
        <div className="space-x-2">
          <Twitter className={baseIconClasses} />
          <Facebook className={baseIconClasses} />
          <Linkedin className={baseIconClasses} />
          <LinkIcon className={baseIconClasses}></LinkIcon>
        </div>
        <div className="space-x-2">
          <Bookmark className={clsx(baseIconClasses, "text-green-500")} />
          <MoreVertical className={baseIconClasses} />
        </div>
      </div>
    </div>
  );
}
