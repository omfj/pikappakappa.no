import { cn } from "@/lib/cn";
import "@/styles/globals.css";
import { Cardo, Source_Sans_Pro } from "next/font/google";

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  variable: "--font-source",
  weight: "400",
});

const cardo = Cardo({
  subsets: ["latin"],
  variable: "--font-cardo",
  weight: "700",
});

export const metadata = {
  title: "Pi Kappa Kappa",
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
