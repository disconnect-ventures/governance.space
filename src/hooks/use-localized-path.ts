import { useParams } from "next/navigation";
import { Locale } from "~/config/i18n";

export function useLocalizedPath() {
  const params = useParams();
  const currentLocale = params?.lang as Locale;

  const getLocalizedPath = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

    return `/${currentLocale}/${normalizedPath}`;
  };

  return { getLocalizedPath, currentLocale };
}
