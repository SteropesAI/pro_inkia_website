import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import { CartProvider } from "@/lib/cart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "pro.inkia.art — L'art qui vous ressemble",
  description:
    "Des tableaux exclusifs pour valoriser votre espace professionnel. L'art qui vous ressemble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body>
        <CartProvider>
          <SiteNav />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
