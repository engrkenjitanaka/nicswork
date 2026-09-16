import type { Metadata, Viewport } from "next";
import { Poppins, Sacramento } from "next/font/google";
import { person } from "@/content";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicswork.online";

const description =
  "Portfolio of Jonji Jose Coronel, a multimedia designer working in graphic design, video editing and digital content — brand identities, marketing collateral, short-form social video and long-form YouTube work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — ${person.role}`,
    template: `%s — ${person.name}`,
  },
  description,
  applicationName: `${person.name} Portfolio`,
  authors: [{ name: person.name }],
  creator: person.name,
  keywords: [
    "multimedia designer",
    "video editor",
    "graphic designer",
    "short-form video",
    "brand identity",
    "Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: `${person.name} — ${person.role}`,
    title: `${person.name} — ${person.role}`,
    description,
    url: "/",
    locale: "en_PH",
    images: [
      {
        url: "/media/hero-bg.jpg",
        width: 1920,
        height: 822,
        alt: `${person.name} at his desk`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.role}`,
    description,
    images: ["/media/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${sacramento.variable}`}>
      <body>{children}</body>
    </html>
  );
}
