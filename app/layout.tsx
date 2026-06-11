import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-sync";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1528" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "NetPulse",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Network Connectivity Monitor",
  operatingSystem: "Android 8.0+",
  description: "Free, open-source Android app that monitors internet connectivity and your exit IP, and alerts you the moment the connection drops. Not a VPN — it only observes; useful for watching whether a VPN or proxy connection is still up.",
  url: "https://netpulse.shuttlelab.org",
  downloadUrl: "https://github.com/ShuttleLab/NetPulse/releases/latest",
  softwareHelp: "https://netpulse.shuttlelab.org/",
  screenshot: [
    "https://netpulse.shuttlelab.org/screenshots/1.png",
    "https://netpulse.shuttlelab.org/screenshots/2.png",
    "https://netpulse.shuttlelab.org/screenshots/3.png",
  ],
  featureList: [
    "Reliable reachability check (strict generate_204, ignores captive portals)",
    "Exit IP and geolocation with change detection",
    "Persistent status-bar connection icon",
    "Rolling check log with latency trend",
    "Disconnect alerts (vibration and sound)",
    "Bilingual (English / 中文) and auto-restart on boot",
  ],
  isAccessibleForFree: true,
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  sameAs: ["https://github.com/ShuttleLab/NetPulse"],
  author: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  publisher: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  offers: [{ "@type": "Offer", price: "0", priceCurrency: "USD" }],
};

const DESC = "Free, open-source Android app that monitors whether the internet is reachable, shows your current exit IP and its location, and alerts you the moment the connection drops. Not a VPN — it only observes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://netpulse.shuttlelab.org"),
  title: "NetPulse — Connectivity & Exit-IP Monitor for Android",
  description: DESC,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NetPulse — Connectivity & Exit-IP Monitor for Android",
    description: DESC,
    siteName: "NetPulse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetPulse — Connectivity & Exit-IP Monitor for Android",
    description: DESC,
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "NetPulse" },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
          <Toaster position="top-center" richColors closeButton duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
