import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Link from "~/components/features/Link"; // assuming you're using your custom Link component

export const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-secondary text-center px-4">
      <Link
        href="#"
        className="text-primary text-sm font-medium hover:text-primary/90 transition-colors mb-2"
      >
        Governance Space on Cardano Blockchain <ArrowRightIcon />
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Are You Ready to Participate?
      </h1>
      <p className="text-muted-foreground mb-6">
        Building Together to Drive Cardano Forward.
      </p>
      <div className="flex w-full max-w-md">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full flex-1 px-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
          Subscribe
        </button>
      </div>
    </div>
  );
};
