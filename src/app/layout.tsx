import { cn } from "@/lib/cn";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Cardo, Source_Sans_Pro } from "next/font/google";

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  variable: "--font-source",
  weight: "400",
});

const cardo = Cardo({
  subsets: ["latin"],
  variable: "--font-cardo",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pi Kappa Kappa",
    template: "%s | Pi Kappa Kappa",
  },
  description:
    "Pi Kappa Kappa er et veletablert kollektiv i hjertet av Bergen.",
  themeColor: "#1a1a1a",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body
        className={cn(
          "flex flex-col min-h-screen",
          sourceSansPro.variable,
          cardo.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
