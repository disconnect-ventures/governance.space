"use client";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLocale } from "~/hooks/use-locale";
import { cn, localizePath } from "~/lib/utils";
import { Dictionary } from "~/config/dictionaries";

type BackButtonProps = {
  href?: string;
  translations: Dictionary["general"];
} & ButtonProps;

export const BackButton = ({
  href,
  translations,
  ...props
}: BackButtonProps) => {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <Button
      onClick={() =>
        href ? router.push(localizePath(locale, href)) : router.back()
      }
      variant="ghost"
      {...props}
      className={cn(
        "flex items-center text-primary hover:text-primary/90 px-0",
        props.className
      )}
    >
      <ArrowLeft className="w-5 h-5 mr-1" />
      {translations.back}
    </Button>
  );
};
