"use client";
import { BackButton } from "./BackButton";
import { Twitter, Facebook, Linkedin, LinkIcon, CheckCircle } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import CopyToClipboard from "../features/CopyToClipboard";
import { PUBLIC_APP_DOMAIN } from "~/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { withSuspense } from "~/lib/withSuspense";

type TopBarProps = {
  backHref?: string;
  shareUrl?: string;
  shareTitle?: string;
};

type SocialPlatform = "facebook" | "twitter" | "linkedin";

const getShareUrl = (path: string, params: string) => {
  return `${PUBLIC_APP_DOMAIN}${path}${params ? `?${params}` : ""}`;
};

export const TopBar = withSuspense(({ backHref, ...props }: TopBarProps) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [documentTitle, setDocumentTitle] = useState("");

  const [activePlatform, setActivePlatform] = useState<SocialPlatform | null>(null);
  const [showHelper, setShowHelper] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const TOOLTIP_DURATION = 20000;

  useEffect(() => {
    setDocumentTitle(document.title);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [path, searchParams]);

  const shareUrl = useMemo(
    () => props.shareUrl || getShareUrl(path, searchParams.toString()),
    [path, searchParams, props],
  );

  const shareTitle = useMemo(
    () => props.shareTitle || documentTitle,
    [props.shareTitle, documentTitle],
  );

  const baseIconClasses = "w-4 h-4 inline cursor-pointer";

  const shareUrls = useMemo(
    () => ({
      twitter: `https://twitter.com/intent/tweet?`,
      facebook: `https://www.facebook.com/sharer/sharer.php?`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?`,
    }),
    [],
  );

  const getShareText = (platform: SocialPlatform): string => {
    switch (platform) {
      case "twitter":
        return `${shareTitle}\n${shareUrl}`;
      case "facebook":
        return `${shareTitle}\n${shareUrl}`;
      case "linkedin":
        return `${shareTitle}\n${shareUrl}`;
      default:
        return `${shareTitle}\n${shareUrl}`;
    }
  };

  const getPlatformInstructions = (platform: SocialPlatform): string => {
    switch (platform) {
      case "twitter":
        return "Twitter will open in a moment. Please paste the text into the tweet field.";
      case "facebook":
        return "Facebook will open in a moment. Please paste the text into the post field.";
      case "linkedin":
        return "LinkedIn will open in a moment. Please paste the text when sharing.";
      default:
        return "Please paste the copied text when the sharing window opens.";
    }
  };

  const handleShare = (platform: SocialPlatform) => {
    setActivePlatform(platform);

    const shareText = getShareText(platform);

    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        setShowHelper(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          window.open(shareUrls[platform], `${platform}-share-dialog`, "width=626,height=436");
        }, 800);

        timerRef.current = setTimeout(() => {
          setShowHelper(false);
          setActivePlatform(null);
        }, TOOLTIP_DURATION);
      })
      .catch((err) => {
        console.error(`Failed to copy text for ${platform}:`, err);
        window.open(shareUrls[platform], `${platform}-share-dialog`, "width=626,height=436");
      });
  };

  const closeHelper = () => {
    setShowHelper(false);
    setActivePlatform(null);
  };

  return (
    <div className="flex justify-between gap-8">
      <BackButton href={backHref} />
      <div className="flex gap-4 items-center">
        <span>Share:</span>
        <div className="space-x-2 relative">
          <span className="relative inline-block">
            <Twitter className={baseIconClasses} onClick={() => handleShare("twitter")} />
          </span>

          <span className="relative inline-block">
            <Facebook className={baseIconClasses} onClick={() => handleShare("facebook")} />
          </span>

          <span className="relative inline-block">
            <Linkedin className={baseIconClasses} onClick={() => handleShare("linkedin")} />
          </span>

          {showHelper && activePlatform && (
            <div className="absolute right-0 top-6 w-64 p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground rounded shadow-lg border border-border dark:border-border z-50 text-left">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary dark:text-primary" />
                  <span className="text-sm font-medium">Text copied!</span>
                </div>
                <button
                  onClick={closeHelper}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              </div>

              <p className="text-xs mb-2">{getPlatformInstructions(activePlatform)}</p>

              <div className="text-xs bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground px-2 py-1 rounded flex items-center gap-1.5">
                <span className="font-medium capitalize">{activePlatform}</span>
                <span>Press Ctrl+V (or ⌘+V) to paste</span>
              </div>
            </div>
          )}
        </div>
        <div className="space-x-2">
          <CopyToClipboard
            className="inline p-0"
            value={shareUrl}
            icon={<LinkIcon className={baseIconClasses} />}
          />
        </div>
      </div>
    </div>
  );
});
