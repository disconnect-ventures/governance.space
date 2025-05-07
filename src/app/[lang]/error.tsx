"use client";

import { useTranslation } from "~/hooks/use-translation/use-translation";

export default function Error({ reset }: { reset: () => void }) {
  const { dictionary } = useTranslation();
  return (
    <div className="mx-auto my-6 max-w-xl rounded-md border border-border bg-card p-6 md:p-10 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold">{dictionary.error.title}</h2>
      <p className="my-3 text-muted-foreground">
        {dictionary.error.description}
      </p>
      <button
        className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
        onClick={() => reset()}
      >
        {dictionary.error.tryAgain}
      </button>
    </div>
  );
}
