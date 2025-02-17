import type { Metadata } from "next";

import "./globals.css";
import Model from "@/components/Model";

export const metadata: Metadata = {
  title: "Trello 2.0 clone",
  description: "Generated by Fahad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f5f6f8]">{children}
      <Model/>
      </body>
    </html>
  );
}
