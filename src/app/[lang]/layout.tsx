import type { Metadata } from "next";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
// import { CallToAction } from "~/components/features/CallToAction";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { Toaster } from "~/components/ui/toaster";
import { AnnouncementBar } from "~/components/layout/AnnouncementBar";
import { GoogleTagManager } from "@next/third-parties/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/layout/AppSidebar";
import { Inter } from "next/font/google";
import ClientProvider from "~/hooks/MeshProvider"; // Importando o novo Provider
import "./globals.css";
import "@meshsdk/react/styles.css";
import { i18n, Locale } from "~/config/i18n";
import { TranslationProvider } from "~/hooks/use-translation/translation-context";
import { getDictionary } from "~/config/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale.key }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://governancespace.com"),
  title: "Governance Space",
  description: "All-in-One Governance Platform",
  openGraph: {
    url: "https://governancespace.com",
    title: "Governance Space",
    description: "All-in-One Governance Platform",
    images: [{ url: "/assets/open-graph.png", width: 1512, height: 589 }],
  },
};

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
    <html lang={params.lang}>
      <GoogleTagManager gtmId="GTM-W47W68BT" />
      <body
        className={`${inter.className} antialiased min-h-[100vh] flex flex-col`}
      >
        <TranslationProvider value={{ dictionary, locale: params.lang }}>
          <SidebarProvider>
            <ClientProvider>
              <div className="w-full">
                <AnnouncementBar />
                <Header />
                <AppSidebar />
                <main className="min-h-[50vh] flex flex-col gap-4 justify-between bg-gray-100 pt-2">
                  <div className="w-full max-w-7xl mx-auto relative my-4 px-4 md:px-8">
                    <Breadcrumbs />
                    {children}
                  </div>
                  {/* <CallToAction /> */}
                </main>
                <Toaster />
                <Footer />
              </div>
            </ClientProvider>
          </SidebarProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
