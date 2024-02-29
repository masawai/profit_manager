import Footer from "@/components/Footer";
import { GTM_ID } from "@/utils/gtm";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
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
      <head>
        <Suspense>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${GTM_ID}');
    `,
            }}
          />
        </Suspense>
      </head>
      <body className="bg-background text-foreground">
        <Suspense>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </Suspense>
        <main className="min-h-screen flex flex-col items-center font-sans">
          {children}
        </main>
      </body>
      <Footer />
    </html>
  );
}
