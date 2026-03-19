import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Linkedin } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Work AIssist - Dominez le marché de l'emploi",
  description: "L'outil ultime pour décrocher votre prochain job : CV, Lettres de motivation IA, et base de contacts premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0d11] text-gray-100 bg-mesh-gradient bg-fixed antialiased">
        <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <NextAuthProvider>
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <footer className="bg-[#0b0d11]/80 backdrop-blur-md border-t border-gray-800/50 py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm italic">W</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Work <span className="text-blue-500">AI</span>ssist</span>
                  </div>
                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
                    La plateforme d'élite qui combine intelligence artificielle et psychologie du recrutement pour accélérer votre carrière.
                  </p>
                  <div className="flex gap-4">
                    {/* Placeholder for social icons */}
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-600/20 transition-all cursor-pointer">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Plateforme</h4>
                  <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <li><Link href="/lettre-motivation" className="hover:text-white transition-colors">Générateur de Lettres</Link></li>
                    <li><Link href="/cv" className="hover:text-white transition-colors">CV Builder Elite</Link></li>
                    <li><Link href="/audit-linkedin" className="hover:text-white transition-colors">Audit LinkedIn</Link></li>
                    <li><Link href="/entretien-ia" className="hover:text-white transition-colors">Entretien IA</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Partenariat</h4>
                  <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <li><Link href="/partners" className="hover:text-white transition-colors">Devenir Partenaire</Link></li>
                    <li><Link href="/api-docs" className="hover:text-white transition-colors">API & Devs</Link></li>
                    <li><Link href="/enterprise" className="hover:text-white transition-colors">Offre Entreprise</Link></li>
                    <li><Link href="/press" className="hover:text-white transition-colors">Espace Presse</Link></li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
                  © 2026 Work AIssist. Dominez votre futur.
                </div>
                <div className="flex gap-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  <Link href="/legal" className="hover:text-white transition-colors">Légal</Link>
                  <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                  <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                </div>
              </div>
            </div>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
