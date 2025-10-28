import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ClientWrapper from "@/components/ui/ClientHeader";
import ThemeHeadIcons from "@/components/ui/ThemeHeaderIcon";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Grids",
  description: "The Number one Renewables Saas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    suppressHydrationWarning
    >
      <head>
        <ThemeHeadIcons/>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        value={{ light: "light", dark: "dark" }}
      >
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>

      </body>
    </html>
  );
}
