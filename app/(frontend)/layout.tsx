import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import { ContactCard } from "./components/ui/ContactCard";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "İlker Balcılar | Software Developer",
  description:
    "Explore the portfolio of İlker Balcılar, a passionate developer specializing in web development and software engineering. Check out my projects, blog, and the tech stacks I work with to create innovative digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <main className="container py-3 lg:py-9 flex flex-col gap-3 lg:gap-12 px-3 lg:px-0">
          <Header />
          <section className="w-full max-w-6xl mx-auto">{children}</section>
          <ContactCard />

          <Footer />
        </main>
        <ScrollProgressBar />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
