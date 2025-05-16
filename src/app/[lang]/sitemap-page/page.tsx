import { Metadata } from "next";
import SitemapPage from "~/components/features/SitemapPage";
import { PageProps } from "~/app/[lang]/layout";
import { getDictionary } from "~/config/dictionaries";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.general.sitemap || "Sitemap"} | ${dictionary.metatags.title || "Governance Space"}`,
    description:
      dictionary.general.sitemapDescription ||
      "Complete site map of governance.space",
  };
}

export default async function LocalizedSitemapPageRoute({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  return <SitemapPage translations={dictionary} />;
}
