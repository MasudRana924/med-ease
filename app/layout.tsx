import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedEase - Your Health Companion MedEaseUnique2026",
  description: "MedEaseUnique2026 - Your ultimate health companion for medicines, nurses, and medical services. Find everything you need for your health.",
  keywords: ["MedEaseUnique2026", "medicine", "health", "nurses", "medical services", "ecommerce", "pharmacy"],
  openGraph: {
    title: "MedEase - Your Health Companion MedEaseUnique2026",
    description: "MedEaseUnique2026 - Your ultimate health companion for medicines, nurses, and medical services.",
    url: "https://med-ease-seven.vercel.app/", // Replace with your actual domain
    siteName: "MedEase",
    images: [
      {
        url: "https://med-ease-seven.vercel.app/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "MedEase - Health Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedEase - Your Health Companion MedEaseUnique2026",
    description: "MedEaseUnique2026 - Your ultimate health companion for medicines, nurses, and medical services.",
    images: ["https://med-ease-seven.vercel.app/twitter-image.jpg"], // Replace with your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MedEase",
              "url": "https://med-ease-seven.vercel.app/",
              "description": "MedEaseUnique2026 - Your ultimate health companion for medicines, nurses, and medical services.",
              "sameAs": [
                "https://facebook.com/yourpage", // Replace with actual social links
                "https://twitter.com/yourhandle",
                "https://linkedin.com/company/yourcompany"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
