import { Banner } from "~/components/features/home/Banner";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "./layout";
import { FeatureSection } from "~/components/features/home/FeatureSection";

export default async function IndexPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-24">
      <Banner {...dictionary.homepage.banner} />
      <FeatureSection
        title={dictionary.homepage.whyChooseUs.title}
        subtitle={dictionary.homepage.whyChooseUs.subtitle}
        features={dictionary.homepage.whyChooseUs.features}
        layoutClassName={
          "grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        }
      />
      <FeatureSection
        title={dictionary.homepage.features.title}
        features={dictionary.homepage.features.features}
        layoutClassName={"grid-cols-1 md:grid-cols-3 gap-8"}
      />
    </div>
  );
}
