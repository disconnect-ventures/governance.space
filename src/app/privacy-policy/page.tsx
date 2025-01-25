import { BookOpenCheckIcon } from "lucide-react";
import { PageTitle } from "~/components/layout/PageTitle";

export default async function PrivacyPolicyPage() {
  return (
    <div className="">
      <PageTitle
        title="Privacy Policy"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
      />

      <div className="mt-6 space-y-6 text-gray-700">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          auctor cursus nisi, vitae aliquam nulla tempor vitae. Ut metus tortor,
          aliquet id mi sit amet, condimentum tristique urna. Proin nec justo et
          lorem laoreet efficitur et vitae nisi. Cras pellentesque laoreet
          metus, a malesuada orci consectetur eget. Vivamus quis arcu metus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          auctor cursus nisi, vitae aliquam nulla tempor vitae. Ut metus tortor,
          aliquet id mi sit amet, condimentum tristique urna.
        </p>
        <p>
          Vivamus quis arcu metus. Cras pellentesque laoreet metus, a malesuada
          orci consectetur eget. Ut metus tortor, aliquet id mi sit amet,
          condimentum tristique urna.
        </p>
        <p>
          Proin nec justo et lorem laoreet efficitur et vitae nisi. Cras
          pellentesque laoreet metus, a malesuada orci consectetur eget. Vivamus
          quis arcu metus.
        </p>
        <p>
          Vivamus quis arcu metus. Cras pellentesque laoreet metus, a malesuada
          orci consectetur eget. Ut metus tortor, aliquet id mi sit amet,
          condimentum tristique urna.
        </p>
      </div>
    </div>
  );
}
