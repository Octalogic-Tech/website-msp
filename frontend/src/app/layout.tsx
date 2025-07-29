'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { CartProvider } from "./components/shop/CartContext";
import { QuoteProvider } from "./components/shop/QuoteContext";
import { ToastProvider } from "./components/shop/ToastContext";
import MobileCTA from "./components/shop/MobileCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <QuoteProvider>
            <ToastProvider>
              <Navigation />
              {children}
              <MobileCTA />
            </ToastProvider>
          </QuoteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
