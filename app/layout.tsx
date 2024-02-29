import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Profit Manager",
  description: "会社の弱点を可視化する利益管理ツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={GeistSans.className}>
      {/* <head>
        <Suspense>
          <GoogleAnalyticsScript />
        </Suspense>
      </head> */}
      <body className="bg-background text-foreground">
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
        <main className="min-h-screen flex flex-col items-center font-sans">
          {children}
        </main>
      </body>
      <Footer />
    </html>
  );
}
