import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SahabatLokerMakassar - Platform Lowongan Kerja Terbaik di Makassar",
  description:
    "Temukan lowongan kerja terbaik di Makassar dan Sulawesi Selatan. Platform job portal modern yang menghubungkan pencari kerja dengan perusahaan terpercaya.",
  keywords:
    "sahabat loker makassar, loker makassar, lowongan kerja makassar, kerja di makassar, job makassar, karir makassar",
  authors: [{ name: "SahabatLokerMakassar" }],
  openGraph: {
    title: "SahabatLokerMakassar - Platform Lowongan Kerja Terbaik di Makassar",
    description:
      "Temukan lowongan kerja terbaik di Makassar dan Sulawesi Selatan",
    url: "https://sahabatlokermakassar.com",
    siteName: "SahabatLokerMakassar",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SahabatLokerMakassar - Platform Lowongan Kerja Terbaik di Makassar",
    description:
      "Temukan lowongan kerja terbaik di Makassar dan Sulawesi Selatan",
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
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
