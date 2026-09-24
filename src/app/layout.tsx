import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lazzat Marketing Portal",
  description:
    "Lazzat Grill & Shakes marketing strategy portal — brand knowledge, paid plan, and assistant.",
  icons: {
    icon: [{ url: "/lazzat-logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/lazzat-logo.jpg", type: "image/jpeg" }],
    shortcut: "/lazzat-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} antialiased`}>{children}</body>
    </html>
  );
}
