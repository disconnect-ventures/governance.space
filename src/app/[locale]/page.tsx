import { Metadata } from "next";
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
  title: "Governance Space - All-in-One Governance Platform",
  description: "All-in-One Governance Platform",
};

export default function Home() {
  const t = useTranslations("HomePage");

  return <div className="space-y-4">{t("title")}</div>;
}
