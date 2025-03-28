"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLocale } from "~/hooks/use-locale";
import { localizePath } from "~/lib/utils";

type BackButtonProps = {
  href?: string;
};

export const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <Button
      onClick={() =>
        href ? router.push(localizePath(locale, href)) : router.back()
      }
      className="flex items-center text-primary hover:text-primary/90"
      variant="ghost"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </Button>
  );
};
