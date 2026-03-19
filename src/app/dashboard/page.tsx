"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Linkedin, 
  Database, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Clock,
  Trash2,
  Download
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [letters, setLetters] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchDocuments();
    }
  }, [status, router]);

  const fetchDocuments = async () => {
    try {
      const [lettersRes, cvsRes] = await Promise.all([
        fetch("/api/letters"),
        fetch("/api/cvs")
      ]);
      const lettersData = await lettersRes.json();
      const cvsData = await cvsRes.json();
      setLetters(lettersData);
      setCvs(cvsData);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0d11] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold italic">Chargement de votre univers...</p>
        </div>
      </div>
    );
  }

  const tips = [
    {
      title: "Optimisation Profil",
      desc: "Votre profil LinkedIn est à 80%. Ajoutez une bannière pro pour passer à 100%.",
      icon: <Linkedin className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Stratégie Réseau",
      desc: "Vous avez 5 nouveaux décideurs dans votre secteur. Envoyez une demande de connexion.",
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0d11] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-white italic mb-2 tracking-tight">
              Bonjour, <span className="text-blue-500">{session?.user?.name}</span>
            </h1>
            <p className="text-gray-500 text-sm">Prêt à dominer le marché aujourd'hui ?</p>
          </div>
          <div className="flex items-center gap-3 p-1 bg-[#161b22] border border-gray-800 rounded-2xl">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black rounded-xl shadow-lg">
              PLAN SENIOR
            </div>
            <div className="px-4 py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Générations illimitées
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Stats & Tips */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#161b22] p-6 rounded-3xl border border-gray-800">
              <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest">Intelligence Tips</h3>
              <div className="space-y-6">
                {tips.map((tip, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        {tip.icon}
                      </div>
                      <span className="text-xs font-bold text-gray-300">{tip.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 rounded-3xl border border-blue-500/20">
              <h3 className="text-sm font-black text-blue-400 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Marché Caché
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed mb-6 italic">
                "3 postes de Directeur Marketing viennent d'ouvrir en interne chez L'Oréal."
              </p>
              <Link href="/offres" className="inline-flex items-center gap-2 text-[10px] font-black text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                VOIR LES OFFRES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right: Saved Documents */}
          <div className="lg:col-span-3 space-y-8">
            {/* Letters Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Lettres de Motivation IA
                </h2>
                <Link href="/lettre-motivation" className="text-xs font-bold text-blue-500 hover:underline">
                  Nouvelle génération +
                </Link>
              </div>
              
              {letters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {letters.map((letter: any) => (
                    <div key={letter.id} className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all group relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-1">{letter.jobTitle}</h4>
                      <p className="text-xs text-gray-500 mb-4">{letter.company}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-600">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(letter.createdAt).toLocaleDateString()}</span>
                        <Link href={`/lettre-motivation?id=${letter.id}`} className="text-blue-500 font-bold hover:underline">Editer</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#161b22] border border-dashed border-gray-800 p-12 rounded-3xl text-center">
                  <p className="text-gray-600 italic">Aucune lettre sauvegardée pour le moment.</p>
                </div>
              )}
            </section>

            {/* CV Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-400" /> Mes CVs Premium
                </h2>
                <Link href="/cv" className="text-xs font-bold text-blue-500 hover:underline">
                  Créer un CV +
                </Link>
              </div>

              {cvs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvs.map((cv: any) => (
                    <div key={cv.id} className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all group flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 group-hover:border-blue-500/30 transition-colors">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-white text-sm">{cv.title}</h4>
                        <p className="text-[10px] text-gray-500">Dernière modif: {new Date(cv.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-400">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#161b22] border border-dashed border-gray-800 p-12 rounded-3xl text-center">
                  <p className="text-gray-600 italic">Votre futur CV professionnel vous attend.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
