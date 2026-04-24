import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Manrope({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maxlemeriwas.com"),
  title: "Max Lemeriwas | Freelance Geomatic Engineer & Geospatial Analyst",
  description:
    "Freelance Geomatic Engineer and Geospatial Analyst based in Seattle, delivering GIS, remote sensing, conservation mapping, and climate resilience solutions.",
  keywords: [
    "Geomatic Engineer",
    "Geospatial Analyst",
    "GIS Consultant",
    "Remote Sensing",
    "Conservation Mapping",
    "Seattle",
  ],
  openGraph: {
    title: "Max Lemeriwas | Geospatial Portfolio",
    description:
      "Freelance specialist solving real-world geospatial problems across conservation, urban planning, and sustainability.",
    url: "https://maxlemeriwas.com",
    siteName: "Max Lemeriwas Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
