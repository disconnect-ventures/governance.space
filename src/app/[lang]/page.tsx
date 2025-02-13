import { Locale } from "~/config/i18n";
import { getDictionary } from "../../config/dictionaries";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <div>
        <p>Current locale: {lang}</p>
      </div>
    </div>
  );
}