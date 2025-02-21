"use client";

import { BackButton } from "./BackButton";
import {
  Twitter,
  Facebook,
  Linkedin,
  Bookmark,
  MoreVertical,
  LinkIcon,
} from "lucide-react";
import { useMemo } from "react";
import clsx from "clsx";
import CopyToClipboard from "../features/CopyToClipboard";
import { PUBLIC_APP_DOMAIN } from "~/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";

type TopBarProps = {
  backHref?: string;
  shareUrl?: string;
  shareTitle?: string;
};

const getShareUrl = (path: string, params: string) => {
  return `${PUBLIC_APP_DOMAIN}${path}${params ? `?${params}` : ""}`;
};

export function TopBar({ backHref, ...props }: TopBarProps) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const shareUrl = useMemo(
    () => props.shareUrl || getShareUrl(path, searchParams.toString()),
    [path, searchParams, props]
  );
  const shareTitle = useMemo(() => props.shareTitle || document.title, [props]);

  const baseIconClasses = "w-4 h-4 inline cursor-pointer";
  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);
  const encodedTitle = useMemo(
    () => encodeURIComponent(shareTitle),
    [shareTitle]
  );
  const shareUrls = useMemo(
    () => ({
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&text=${encodedTitle}`,
    }),
    [encodedUrl, encodedTitle]
  );

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="flex justify-between gap-8">
      <BackButton href={backHref} />
      <div className="flex gap-4 items-center">
        <div className="space-x-2">
          <Twitter
            className={baseIconClasses}
            onClick={() => handleShare("twitter")}
          />
          <Facebook
            className={baseIconClasses}
            onClick={() => handleShare("facebook")}
          />
          <Linkedin
            className={baseIconClasses}
            onClick={() => handleShare("linkedin")}
          />
        </div>
        <div className="space-x-2">
          <CopyToClipboard
            className="inline p-0"
            value={shareUrl}
            icon={<LinkIcon className={baseIconClasses} />}
          />
          <Bookmark className={clsx(baseIconClasses, "text-green-500")} />
          <MoreVertical className={baseIconClasses} />
        </div>
      </div>
    </div>
  );
}
