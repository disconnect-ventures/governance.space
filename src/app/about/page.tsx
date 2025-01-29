import { BookOpenCheckIcon, StarIcon } from "lucide-react";
import { Metadata } from "next";
import { PageTitle } from "~/components/layout/PageTitle";

export const metadata: Metadata = {
  title: "Governance Space - About",
  description: "All-in-One Governance Platform",
};

export default async function AboutPage() {
  return (
    <div className="">
      <PageTitle
        title="About"
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

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Steven Laff", role: "Developer" },
          { name: "Steven Laff", role: "SPO" },
          { name: "Steven Laff", role: "Member" },
        ].map((testimonial, index) => (
          <div key={index} className="text-center space-y-4">
            <div className="flex justify-center">
              {[...Array(5)].map((_, starIndex) => (
                <StarIcon key={starIndex} className="text-yellow-500 w-6 h-6" />
              ))}
            </div>
            <p className="text-gray-600">Este é um teste de depoimento</p>
            <p className="font-semibold">
              {testimonial.name} - {testimonial.role}
            </p>
            <a href="#" className="text-blue-600 hover:underline">
              Ir para o Portal
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
