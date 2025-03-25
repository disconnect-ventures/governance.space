import { BookOpenCheckIcon, StarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "~/components/features/Link";
import ComingSoon from "~/components/layout/ComingSoon";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Governance Space - About",
  description: "All-in-One Governance Platform",
};

export default async function AboutPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  return (
    <div className="bg-background text-foreground dark:bg-background dark:text-foreground">
      <PageTitle
        title={dictionary.header.titleAbout}
        icon={
          <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon className="text-foreground" />
          </div>
        }
        translations={dictionary.pageAbout}
      />
      <div className="mt-6 space-y-6 text-foreground dark:text-foreground/80">
        <p>{dictionary.pageAbout.longDescription}</p>
        <ComingSoon>
          <p>
            Vestibulum lorem ipsum, volutpat vel sodales ut, faucibus sed nulla. Cras faucibus
            ullamcorper elit eget pharetra. Mauris sit amet ante volutpat, porttitor massa
            condimentum, faucibus ante. Duis porta laoreet quam, vel volutpat erat maximus nec.
            Integer dolor velit, auctor in metus eget, ornare lacinia urna. Cras vitae blandit libero.
            Duis egestas interdum tellus, vitae auctor nulla molestie vitae. Pellentesque fermentum,
            mauris vitae mattis maximus, erat dui tempor nibh, ut rhoncus ex erat ut lectus. Curabitur
            fringilla leo massa, vel viverra ante finibus sed. Nam pellentesque, lacus sed condimentum
            fermentum, est elit semper libero, in commodo erat lacus sagittis nisi.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Steven Laff", role: "Developer" },
              { name: "Steven Laff", role: "SPO" },
              { name: "Steven Laff", role: "Member" },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 bg-card dark:bg-card/50 rounded-lg shadow-sm"
              >
                <div className="flex justify-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <StarIcon key={starIndex} className="text-yellow-500 w-6 h-6" />
                  ))}
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground/80">
                  Este é um teste de depoimento
                </p>
                <p className="font-semibold text-foreground dark:text-foreground/90">
                  {testimonial.name} - {testimonial.role}
                </p>
                <a href="#" className="text-primary hover:underline dark:text-primary/90">
                  Ir para o Portal
                </a>
              </div>
            ))}
          </div>
        </ComingSoon>

        <p>
          <span className="text-sm text-muted-foreground dark:text-muted-foreground/80">
            Built on:
          </span>
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
            className="text-sm text-muted-foreground dark:text-muted-foreground/80"
          >
            hello@governancespace.com
          </Link>
        </p>
      </div>
    </div>
  );
}
