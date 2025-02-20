"use client";

import { BackButton } from "./BackButton";
import { Twitter, Facebook, Linkedin, Bookmark, MoreVertical, LinkIcon } from "lucide-react";
import { useState } from "react";
import type { LucideProps } from "lucide-react";
import clsx from "clsx";

type TopBarProps = {
  backHref?: string;
  shareUrl?: string;
  shareTitle?: string;
};

export function TopBar({
  backHref,
  shareUrl = typeof window !== "undefined" ? window.location.href : "",
  shareTitle = typeof window !== "undefined" ? document.title : "",
}: TopBarProps) {
  const [copied, setCopied] = useState(false);
  const baseIconClasses = "w-4 h-4 inline cursor-pointer";

  const handleShare = (platform: string): LucideProps["onClick"] => {
    return (event) => {
      event?.preventDefault();
      const encodedUrl = encodeURIComponent(shareUrl);
      const encodedTitle = encodeURIComponent(shareTitle);
      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodedUrl}&title=${encodedTitle}&source=${window.location.hostname}`,
      };
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
    };
  };

  const copyToClipboard: LucideProps["onClick"] = async (event) => {
    event?.preventDefault();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex justify-between gap-8">
      <BackButton href={backHref} />
      <div className="flex gap-8">
        <div className="space-x-2">
          <Twitter className={baseIconClasses} onClick={handleShare("twitter")} />
          <Facebook className={baseIconClasses} onClick={handleShare("facebook")} />
          <Linkedin className={baseIconClasses} onClick={handleShare("linkedin")} />
          <LinkIcon
            className={clsx(baseIconClasses, copied && "text-green-500")}
            onClick={copyToClipboard}
          />
        </div>
        <div className="space-x-2">
          <Bookmark className={clsx(baseIconClasses, "text-green-500")} />
          <MoreVertical className={baseIconClasses} />
        </div>
      </div>
    </div>
  );
}
