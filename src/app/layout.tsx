import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/provider";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "E-Neighbor",
  description: "E-Neighbor",
  icons: {
    icon: "images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          richColors
          expand={false}
          style={{ marginRight: 28 }}
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
