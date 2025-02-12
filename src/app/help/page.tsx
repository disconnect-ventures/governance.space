import { MessageCircleQuestion } from "lucide-react";
import { Metadata } from "next";
import { HelpAccordion } from "~/components/features/HelpAccordion";
import { PageTitle } from "~/components/layout/PageTitle";
import { Input } from "~/components/ui/input";

export const metadata: Metadata = {
  title: "Governance Space - Help",
  description: "All-in-One Governance Platform",
};

export default async function HelpPage() {
  return (
    <div>
      <PageTitle
        title="Help"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <MessageCircleQuestion />
          </div>
        }
      />

      <div className="max-w-3xl mx-auto">
        <div className="p-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full h-12 rounded-md bg-white border border-gray-200 px-6 text-base placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-gray-400"
          />

          <div className="mt-6">
            <HelpAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
