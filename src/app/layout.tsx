import type { Metadata } from "next";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { CallToAction } from "~/components/features/CallToAction";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { Toaster } from "~/components/ui/toaster";
import { AnnouncementBar } from "~/components/layout/AnnouncementBar";
import { GoogleTagManager } from "@next/third-parties/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/layout/AppSidebar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Governance Space",
  description: "All-in-One Governance Platform",
  openGraph: {
    title: "Governance Space",
    description: "All-in-One Governance Platform",
    images: ["/open-graph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-W47W68BT" />
      <body
        className={`${inter.className} antialiased min-h-[100vh] flex flex-col`}
      >
        <SidebarProvider>
          <div className="w-full">
            <AnnouncementBar />
            <Header />
            <AppSidebar />
            <main className="min-h-[50vh] flex flex-col gap-4 justify-between bg-gray-100 pt-2">
              <div className="w-full max-w-7xl mx-auto relative my-4 px-4 md:px-8">
                <Breadcrumbs />
                {children}
              </div>
              <CallToAction />
            </main>
            <Toaster />
            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
