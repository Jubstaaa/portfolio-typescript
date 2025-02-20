import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <main className="container py-9 flex flex-col gap-12">
          <Header />
          <section className="w-full max-w-6xl mx-auto">{children}</section>
          <Footer />
        </main>
        <ScrollProgressBar />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
