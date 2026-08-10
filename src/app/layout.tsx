import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "राजस्थान · Rajasthan Vibe",
  description: "A full-bleed Rajasthani music atmosphere — scenes from Jaipur to the desert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
