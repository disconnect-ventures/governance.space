"use client";

import Link from "next/link";
import { BackButton } from "~/components/layout/BackButton";
import { buttonVariants } from "~/components/ui/button";
import { useTranslation } from "~/hooks/use-translation/use-translation";

export default function NotFound() {
  const { dictionary } = useTranslation();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {dictionary[404].title}
        </h1>
        <p>{dictionary[404].description}</p>
      </div>
      <div className="flex gap-4 items-center">
        <BackButton translations={dictionary.general} className="px-2"/>
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          {dictionary[404].goToHome}
        </Link>
      </div>
    </div>
  );
}
