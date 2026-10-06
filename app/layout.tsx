import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ClientErrorHandler } from "@/components/ui/ClientErrorHandler";
import { ScrollObserver } from "@/components/ui/ScrollObserver";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Paris Decoration - Luxury Event & Wedding Decoration",
    template: "%s | Paris Decoration",
  },
  description:
    "Paris Decoration melayani jasa dekorasi pernikahan, lamaran, ulang tahun, aqiqah, dan acara spesial dengan sentuhan mewah, elegan, dan profesional di Madura & sekitarnya.",
  keywords: [
    "Dekorasi Sumenep",
    "Paris Decoration",
    "Dekorasi Wedding Sumenep",
    "Dekorasi Lamaran",
    "Dekorasi Engagement",
    "Dekorasi Ulang Tahun",
    "Dekorasi Aqiqah Madura",
  ],
  openGraph: {
    title: "Paris Decoration - Luxury Event & Wedding Decoration",
    description:
      "Jasa dekorasi pernikahan, lamaran, ulang tahun, dan event istimewa dengan konsep elegan dan pelayanan terpercaya.",
    url: "https://parisdecoration.com",
    siteName: "Paris Decoration",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-paris-gold-100 selection:text-paris-gold-900">
        <ClientErrorHandler />
        <ScrollObserver />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

