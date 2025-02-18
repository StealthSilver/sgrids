import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sgrids",
  description: "Smart Grid Analytics Landing Page",
  
  icons: {
    icon: "/favicon.ico", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      
      <body className={clsx(ibmPlexSans.className, "antialiased bg-[#ffffff]")}>
        {children}
      </body>
    </html>
  );
}
