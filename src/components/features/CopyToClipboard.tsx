"use client";
import React, { useCallback, useState } from "react";
import { CopyIcon } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { Dictionary } from "~/config/dictionaries";

interface CopyToClipboardProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  translations: Dictionary["general"];
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  className,
  icon,
  children,
  translations,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast({ title: translations.clipboardCopied, description: "" });
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast({ title: translations.clipboardFailed, description: "" });
    }
  }, [toast, value, translations]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        `group flex items-center gap-2 justify-center p-2 rounded-md transition-colors`,
        className
      )}
      aria-label="Copy to clipboard"
    >
      {children}
      {icon || (
        <CopyIcon
          className={`w-4 h-4 ${isCopied ? "text-green-500" : "text-gray-500"} group-hover:text-gray-100`}
        />
      )}
    </button>
  );
};

export default CopyToClipboard;
