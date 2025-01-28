import { BookOpenCheckIcon, StarIcon } from "lucide-react";
import { PageTitle } from "~/components/layout/PageTitle";

export default async function AnalyticsPage() {
  return (
    <div className="">
      <PageTitle
        title="Analytics"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
      />

      <div className="mt-6 space-y-6 text-gray-700">
        <p>
         Page under development.
        </p>
      </div>
      
    </div>
  );
}
