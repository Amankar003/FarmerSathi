import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "FarmerSaathi - Smart Farming Companion | AI-Powered Agriculture",
  description:
    "FarmerSaathi empowers Indian farmers with AI-powered crop predictions, disease detection, live market prices, and smart agricultural solutions. Your digital farming companion.",
  keywords:
    "farming, agriculture, crop prediction, crop disease detection, AI farming, Indian farmers, soil analysis, FarmerSaathi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
