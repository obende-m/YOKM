import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YOKM Ministry | Awake Oh Ye Widows",
  description: "Yendel Ocha Kpeling Ministry (YOKM) is a registered faith-based NGO dedicated to the restoration, healing, and empowerment of widows and vulnerable children since 2015.",
  keywords: ["YOKM", "Yendel Ocha Kpeling Ministry", "Awake Oh Ye Widows", "Widow Empowerment", "NGO Nigeria", "Evangelist Alice", "Mama Alice", "Donations", "Charity"],
  openGraph: {
    title: "YOKM Ministry | Awake Oh Ye Widows",
    description: "Restoring hope, healing hearts, and empowering widows through faith-driven support, advocacy, and community integration.",
    url: "https://yokm.org",
    siteName: "YOKM Ministry",
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
      className={`${geist.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-on-surface bg-background">
        {children}
      </body>
    </html>
  );
}
