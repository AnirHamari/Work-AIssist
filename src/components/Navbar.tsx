"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, UserPlus, Search, LayoutDashboard, Database, Sparkles, LogOut, TrendingUp, Linkedin, Brain } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Accueil", href: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
    { name: "Lettres IA", href: "/lettre-motivation", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { name: "CV Builder", href: "/cv", icon: <FileText className="w-4 h-4" /> },
    { name: "Contacts VIP", href: "/contacts", icon: <Database className="w-4 h-4" /> },
    { name: "Offres", href: "/offres", icon: <Search className="w-4 h-4" /> },
    { name: "Audit LinkedIn", href: "/audit-linkedin", icon: <Linkedin className="w-4 h-4 text-blue-400" /> },
    { name: "Psychologie", href: "/psychologie-recruteur", icon: <Brain className="w-4 h-4 text-purple-400" /> },
    { name: "Entretien IA", href: "/entretien-ia", icon: <Briefcase className="w-4 h-4 text-green-400" /> },
    { name: "Roadmap", href: "/roadmap", icon: <TrendingUp className="w-4 h-4 text-orange-400" /> },
    { name: "Réseautage", href: "/reseautage", icon: <UserPlus className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#0b0d11] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
                <span className="text-white font-bold text-lg italic">W</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Work <span className="text-blue-500">AI</span>ssist</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-gray-800 text-white shadow-inner"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span className="mr-2 opacity-70">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Plan Senior</span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
