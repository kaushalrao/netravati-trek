import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netravati Peak Expedition",
  description: "Cross rivers, chase waterfalls, and stand above the clouds at Netravati Peak.",
  openGraph: {
    title: "Netravati Peak Expedition",
    description: "Join us for an immersive 3-day journey through the pristine forests and waterfalls of the Western Ghats.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netravati Peak Expedition",
    description: "Join us for an immersive 3-day journey through the pristine forests and waterfalls of the Western Ghats.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-(--color-canopy) text-(--color-mist) min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
