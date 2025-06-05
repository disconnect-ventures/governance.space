import { BookOpenCheckIcon, StarIcon } from "lucide-react";
import { Metadata } from "next";
import ComingSoon from "~/components/layout/ComingSoon";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../layout";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageAbout.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function AboutPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
      <div className="bg-background text-foreground dark:bg-background dark:text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
              <BookOpenCheckIcon className="text-foreground" />
            </div>
          }
          translations={dictionary.pageAbout}
        />
        <div className="mt-6 space-y-6 text-foreground dark:text-foreground/80">
          <p>{dictionary.pageAbout.paragraph1}</p>
          <p>{dictionary.pageAbout.paragraph2}</p>
          <p>{dictionary.pageAbout.paragraph3}</p>
          <p>{dictionary.pageAbout.paragraph4}</p>
          <ComingSoon>
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
                      <StarIcon
                        key={starIndex}
                        className="text-yellow-500 w-6 h-6"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-muted-foreground/80">
                    Este é um teste de depoimento
                  </p>
                  <p className="font-semibold text-foreground dark:text-foreground/90">
                    {testimonial.name} - {testimonial.role}
                  </p>
                  <a
                    href="#"
                    className="text-primary hover:underline dark:text-primary/90"
                  >
                    Ir para o Portal
                  </a>
                </div>
              ))}
            </div>
          </ComingSoon>
        </div>
      </div>
    </>
  );
}
