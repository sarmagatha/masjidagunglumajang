import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google"; // <--- Import Amiri
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Konfigurasi Font Amiri
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Masjid Agung Lumajang",
  description: "Pusat Ibadah & Dakwah Umat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${amiri.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}