import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import { ContactCard } from "./components/ui/ContactCard";
import Header from "./components/Header";

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
    <>
      {" "}
      <main className="container py-3 lg:py-9 flex flex-col gap-3 lg:gap-12 px-3 lg:px-0">
        <Header />
        <section className="w-full max-w-6xl mx-auto">{children}</section>
        <ContactCard />

        <Footer />
      </main>
      <ScrollProgressBar />
      <ScrollToTopButton />
    </>
  );
}
