"use client";
import clsx from "clsx";
import NextLink from "next/link";
import { useMemo } from "react";
import { useLocale } from "~/hooks/use-locale";
import { localizePath } from "~/lib/utils";

type LinkProps = React.ComponentProps<typeof NextLink>;

export default function Link(props: LinkProps) {
  const { locale } = useLocale();
  const href = useMemo(() => {
    if (typeof props.href === "undefined") return "#";
    if (!(typeof props.href === "string")) {
      return props.href?.href ?? "/";
    }
    return props.href;
  }, [props]);

  return (
    <NextLink
      {...props}
      className={clsx("transition-colors", props.className)}
      href={localizePath(locale, href)}
    />
  );
}
