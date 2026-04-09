import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entertainment Web App",
  description: "Entertainment Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", outfit.variable, "font-outfit")}
    >
      <body className="min-h-screen flex flex-col bg-primary-950">
        <Navbar />
        <main className="flex flex-1 flex-col justify-start items-center ">
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>
      </body>
    </html>
  );
}
