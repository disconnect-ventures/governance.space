"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "~/hooks/use-translation/use-translation";

export default function Error({
  reset,
  error,
}: {
  reset: () => void;
  error: Error & { digest?: string };
}) {
  const { dictionary } = useTranslation();
  const sentErrorRef = useRef(false);

  const sendError = useCallback(async () => {
    const res = await fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathname: window.location.pathname,
        error: JSON.stringify({
          name: error.name,
          cause: error.cause,
          message: error.message,
          digest: error.digest,
        }),
      }),
    }).catch(() => null);
    if (!res || !res.ok) {
      console.error("Failed to log error.");
      return;
    }
    sentErrorRef.current = true;
  }, [error]);

  useEffect(() => {
    if (sentErrorRef.current) return;
    sendError();
  }, [sendError]);

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
