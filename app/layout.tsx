import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codex Aeternum",
  description: "Um compêndio digital para o sistema de RPG Codex Aeternum.",
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CampaignProvider } from "@/contexts/CampaignContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <html lang="pt-BR">
          <body
            className={`${cinzel.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
          >
            <CampaignProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </CampaignProvider>
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  );
}
