'use client';

import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import "./account/account.css";
import "./account/account.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./components/shop/CartContext";
import { QuoteProvider } from "./components/shop/QuoteContext";
import { ToastProvider } from "./components/shop/ToastContext";
import { SavedProductsProvider } from "./contexts/SavedProductsContext";
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
        <AuthProvider>
          <CartProvider>
            <QuoteProvider>
              <ToastProvider>
                <SavedProductsProvider>
                  <Navigation />
                  <main id="main-content">
                    {children}
                  </main>
                  <Footer />
                  <MobileCTA />
                </SavedProductsProvider>
              </ToastProvider>
            </QuoteProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
