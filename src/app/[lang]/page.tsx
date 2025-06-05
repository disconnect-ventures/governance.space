import { Banner } from "~/components/features/home/Banner";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "./layout";
import { FeatureSection } from "~/components/features/home/FeatureSection";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export default async function IndexPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
      <div className="space-y-24">
        <Banner translations={dictionary.homepage.banner} />
        <FeatureSection
          translations={dictionary.homepage.whyChooseUs}
          layoutClassName={
            "grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
          }
        />
        <FeatureSection
          translations={dictionary.homepage.mainFunctionalities}
          layoutClassName={"grid-cols-1 md:grid-cols-3 gap-8"}
        />
      </div>
    </>
  );
}
