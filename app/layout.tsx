import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asian Hotel and Restaurant | Stay & Dine",
  description:
    "Asian Hotel and Restaurant website with rooms, dining, photos, video and directions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
