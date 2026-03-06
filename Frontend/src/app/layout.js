import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import { getProfile } from "@/lib/api";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const profile = await getProfile();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_55%)]" />
          <Header profile={profile} />
          <main className="relative pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
