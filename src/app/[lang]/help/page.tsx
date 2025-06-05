import { MessageCircleQuestion } from "lucide-react";
import { Metadata } from "next";
import { HelpAccordion } from "~/components/features/HelpAccordion";
import { PageTitle } from "~/components/layout/PageTitle";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageHelp.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function HelpPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
      <div className="bg-background text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
              <MessageCircleQuestion />
            </div>
          }
          translations={dictionary.pageHelp}
        />

        <div className="max-w-3xl mx-auto">
          <div className="p-6">
            {/* <Input
            type="text"
            placeholder="Search..."
            className="w-full h-12 rounded-md bg-card text-card-foreground border-input
            placeholder:text-muted-foreground focus-visible:ring-ring
            focus-visible:ring-offset-background focus-visible:ring-2
            focus-visible:ring-offset-2"
          /> */}

            <div className="mt-6">
              <HelpAccordion translations={dictionary.pageHelp} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
