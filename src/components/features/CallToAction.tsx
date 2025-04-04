import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Link from "~/components/features/Link"; // assuming you're using your custom Link component
import { Dictionary } from "~/config/dictionaries";

type CallToActionProps = {
  translations: Dictionary["newsletter"];
};

export const CallToAction = ({ translations }: CallToActionProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-secondary text-center px-4 ">
      <Link
        href="https://governance.beehiiv.com/subscribe"
        className="text-primary text-sm font-medium hover:text-primary/90 transition-colors mb-2 whitespace-nowrap"
      >
        {translations.newsletterCta} <ArrowRightIcon className="inline" />
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {translations.newsletterTitle}
      </h1>
      <p className="text-muted-foreground mb-6">
        {translations.newsletterDescription}
      </p>
      <div className="flex w-full max-w-md justify-center">
        <iframe
          src="https://embeds.beehiiv.com/c4c117f6-9be0-44b4-928a-da112a0fb31b?slim=true"
          data-test-id="beehiiv-embed"
          height="52"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
};
