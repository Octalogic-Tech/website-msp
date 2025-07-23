'use client';

import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { CartProvider } from "./components/shop/CartContext";
import { QuoteProvider } from "./components/shop/QuoteContext";
import { ToastProvider } from "./components/shop/ToastContext";
import MobileCTA from "./components/shop/MobileCTA";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#f9a825" />
        <meta name="description" content="Industrial machinery and equipment supplier" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider>
          <QuoteProvider>
            <ToastProvider>
              <Navigation />
              <main id="main-content">
                {children}
              </main>
              <Footer />
              <MobileCTA />
            </ToastProvider>
          </QuoteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
