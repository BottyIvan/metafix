import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { CmpConsentBridge } from "@/components/CmpConsentBridge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MetaFix",
    template: "%s | MetaFix",
  },
  description: "View and clean file metadata in seconds.",
};

const trackingEnabled = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const cmpProvider = process.env.NEXT_PUBLIC_CMP_PROVIDER || "custom";
const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
const useCookiebot = cmpProvider === "cookiebot" && Boolean(cookiebotId);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Head>
        {process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT ? (
          <meta
            name="google-adsense-account"
            content={process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT}
          />
        ) : null}
      </Head>
      <body className="min-h-full p-0 m-0 flex flex-col bg-background text-foreground">
        {trackingEnabled ? (
          <Script id="consent-mode-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              window.gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              window.gtag('set', 'ads_data_redaction', true);
            `}
          </Script>
        ) : null}
        {trackingEnabled && useCookiebot ? (
          <Script
            id="cookiebot"
            strategy="beforeInteractive"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={cookiebotId}
            data-blockingmode="auto"
            type="text/javascript"
          />
        ) : null}
        {trackingEnabled && gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        {trackingEnabled ? (
          <CmpConsentBridge provider={useCookiebot ? "cookiebot" : "custom"} />
        ) : null}
        {trackingEnabled && !useCookiebot ? <ConsentBanner /> : null}
      </body>
    </html>
  );
}
