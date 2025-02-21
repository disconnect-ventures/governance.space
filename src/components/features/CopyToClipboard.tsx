"use client";
import React, { useCallback, useState } from "react";
import { CopyIcon } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { twMerge } from "tailwind-merge";

interface CopyToClipboardProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  className,
  icon,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast({ title: "Copied to clipboard", description: "" });
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", description: "" });
    }
  }, [toast, value]);

  return (
    <button
      onClick={handleCopy}
      className={twMerge(
        `flex items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-colors`,
        className
      )}
      aria-label="Copy to clipboard"
    >
      {icon || (
        <CopyIcon
          className={`w-4 h-4 ${isCopied ? "text-green-500" : "text-gray-500"}`}
        />
      )}
    </button>
  );
};

export default CopyToClipboard;
