import { BookOpenCheckIcon, Search } from "lucide-react";
import { HelpAccordion } from "~/components/features/HelpAccordion";
import { PageTitle } from "~/components/layout/PageTitle";
import { Input } from "~/components/ui/input";

export default async function CookiePolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageTitle
        title="Help"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
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
