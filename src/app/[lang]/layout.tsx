import type { Metadata } from "next";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Toaster } from "~/components/ui/toaster";
import { AnnouncementBar } from "~/components/layout/AnnouncementBar";
import { GoogleTagManager } from "@next/third-parties/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/layout/AppSidebar";
import { Inter } from "next/font/google";
import { WalletProvider } from "~/hooks/use-wallet/wallet-context";
import "./globals.css";
import "@meshsdk/react/styles.css";
import { i18n, Locale } from "~/config/i18n";
import { TranslationProvider } from "~/hooks/use-translation/translation-context";
import { getDictionary } from "~/config/dictionaries";
import clsx from "clsx";
import ThemeScript from "~/lib/ThemeScript";
import { CallToAction } from "~/components/features/CallToAction";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale.key }));
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    metadataBase: new URL("https://governancespace.com"),
    title: dictionary.metatags.title,
    description: dictionary.metatags.description,
    openGraph: {
      url: "https://governancespace.com",
      title: dictionary.metatags.title,
      description: dictionary.metatags.description,
      images: [{ url: "/assets/open-graph.png", width: 1512, height: 589 }],
    },
  };
}

export type PageProps<Params = {}> = {
  params: Promise<{ lang: Locale } & Params>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const { children } = props;
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <GoogleTagManager gtmId="GTM-W47W68BT" />
      <body
        className={clsx(
          `${inter.className} antialiased min-h-[100vh] flex flex-col`
        )}
      >
        <TranslationProvider value={{ dictionary, locale: params.lang }}>
          <SidebarProvider>
            <WalletProvider>
              <div className="w-full overflow-x-hidden">
                <AnnouncementBar translations={dictionary.announcementBar} />
                <Header translations={dictionary} />
                <AppSidebar translations={dictionary} />
                <main className="min-h-[50vh] flex flex-col gap-4 justify-between bg-background pt-2">
                  <div className="w-full max-w-7xl mx-auto relative my-4 px-4 md:px-8 mb-64">
                    {children}
                  </div>
                  <CallToAction translations={dictionary.newsletter} />
                </main>
                <Toaster />
                <Footer translations={dictionary.footer} />
              </div>
            </WalletProvider>
          </SidebarProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
