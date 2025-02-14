import { BookOpenCheckIcon, StarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "~/components/features/Link";
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
        <p>All-in-One Governance Platform.</p>

        <p>
          Cardano Voltaire CIP-1694 Offical Transparency & Community Portal.
        </p>

        <p>
          <span className="text-sm text-gray-600">Built on:</span>
          <Link href="https://cardano.org/" target="_blank">
            <Image
              src={"/assets/cardano-logo.svg"}
              alt="Cardano's logo"
              width={140}
              height={30}
              className="object-contain"
            />
          </Link>
        </p>

        <p>
          <Link
            href="mailto:hello@governancespace.com"
            className="text-sm text-gray-600"
          >
            hello@governancespace.com
          </Link>
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
