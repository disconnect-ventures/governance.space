import { ArrowRightIcon } from "lucide-react";
import React from "react";

export const CallToAction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-200 text-center px-4">
      <a
        href="#"
        className="text-blue-600 text-sm font-medium hover:underline mb-2"
      >
        Governance Space on Cardano Blockchain{" "}
        <ArrowRightIcon className="h-4 w-4 inline" />
      </a>
      <h1 className="text-2xl font-bold mb-2">Are You Ready to Participate?</h1>
      <p className="text-gray-600 mb-6">
        Building Together to Drive Cardano Forward.
      </p>
      <div className="flex w-full max-w-md">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Subscribe
        </button>
      </div>
    </div>
  );
};
