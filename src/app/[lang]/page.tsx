import { Banner } from "~/components/features/home/Banner";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "./layout";
import { FeatureSection } from "~/components/features/home/FeatureSection";

export default async function IndexPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="space-y-24">
      <Banner {...dictionary.homepage.banner} />
      <FeatureSection
        title={dictionary.homepage.whyChooseUs.title}
        subtitle={dictionary.homepage.whyChooseUs.subtitle}
        features={dictionary.homepage.whyChooseUs.features}
      />
      <FeatureSection
        title={dictionary.homepage.features.title}
        features={dictionary.homepage.features.features}
        variant="grid"
      />
    </div>
  );
}
