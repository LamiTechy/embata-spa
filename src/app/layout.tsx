import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Embata Massage Spa | Massage Therapist in Ikeja, Lagos",
    template: "%s | Embata Massage Spa",
  },
  description:
    "Embata Massage Spa offers professional massage therapy in Ikeja, Lagos. Open 24 hours. Swedish, deep tissue, hot stone, reflexology and more. Book your session today.",
  keywords: [
    "massage spa Lagos",
    "massage therapist Ikeja",
    "deep tissue massage Lagos",
    "Swedish massage Ikeja",
    "24 hour massage Lagos",
    "spa treatment Ikeja",
    "hot stone massage Lagos",
  ],
  openGraph: {
    title: "Embata Massage Spa | Restore Your Body, Reclaim Your Calm",
    description:
      "Professional massage therapy in Ikeja, Lagos. Open 24 hours, 7 days a week. Swedish, deep tissue, hot stone & more.",
    type: "website",
    locale: "en_US",
    siteName: "Embata Massage Spa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
