import type { Metadata } from "next";
import { Lilita_One, Poppins, Caveat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "FarmerSathi - Kheti me Madad Chahiye?",
  description: "FarmerSathi connects Indian farmers with agriculture experts instantly. Apna expert dhundho!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${lilita.variable} ${poppins.variable} ${caveat.variable}`}>
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
