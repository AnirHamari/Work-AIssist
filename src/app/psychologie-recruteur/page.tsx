"use client";

import { useState } from "react";
import { Brain, Target, Users, Zap, Search, ShieldCheck, Sparkles, AlertCircle, TrendingUp, ChevronRight } from "lucide-react";

type RecruiterType = "Strict Manager" | "Startup Founder" | "Corporate HR" | "Tech Lead";

export default function PsychologieRecruteurPage() {
  const [profileContent, setProfileContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<RecruiterType>("Strict Manager");

  const recruiterProfiles = {
    "Strict Manager": {
      focus: "Résultats & KPI",
      triggers: ["Rentabilité", "Efficacité", "Autonomie"],
      redFlags: ["Manque de chiffres", "Passivité"],
      description: "Il cherche un profil opérationnel qui règle ses problèmes sans poser de questions."
    },
    "Startup Founder": {
      focus: "Culture & Vitesse",
      triggers: ["Scalabilité", "Agilité", "Ownership"],
      redFlags: ["Besoin d'encadrement", "Rigidité"],
      description: "Il cherche un partenaire de croissance prêt à toucher à tout."
    },
    "Corporate HR": {
      focus: "Stabilité & Process",
      triggers: ["Soft Skills", "Loyauté", "Diplômes"],
      redFlags: ["Instabilité", "Non-respect des codes"],
      description: "Elle cherche quelqu'un qui s'intègre parfaitement dans la structure actuelle."
    },
    "Tech Lead": {
      focus: "Code & Architecture",
      triggers: ["Clean Code", "Veille", "Curiosité"],
      redFlags: ["Dette technique", "Obsolete stack"],
      description: "Il cherche un artisan passionné par la qualité et l'innovation."
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileContent) return;
    setIsAnalyzing(true);
    
    try {
      const res = await fetch("/api/ai/psychologie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          profileContent, 
          recruiterType: selectedType 
        })
      });
      
      if (!res.ok) throw new Error("AI analysis failed");
      
      const analysisResult = await res.json();
      setResult(analysisResult);
    } catch (err) {
      console.error("Psychology audit failed:", err);
      alert("Une erreur est survenue lors de l'analyse IA. Vérifiez votre clé API.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Analyse de Perception AIssist</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter uppercase leading-[0.9]">
          DÉCODEZ LA PSYCHOLOGIE <br /> <span className="text-gradient">DES RECRUTEURS</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Un CV n'est pas lu, il est interprété. Notre IA simule le regard de différents profils de décideurs pour détecter les biais cognitifs et optimiser votre impact émotionnel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Selection Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4" /> Ciblez votre interlocuteur
            </h3>
            <div className="space-y-3">
              {(Object.keys(recruiterProfiles) as RecruiterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left group ${
                    selectedType === type 
                    ? "bg-purple-600/10 border-purple-500/50 text-white" 
                    : "bg-[#0b0d11]/50 border-white/5 text-gray-500 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{type}</span>
                    {selectedType === type && <Sparkles className="w-4 h-4 text-purple-400" />}
                  </div>
                  <p className="text-[10px] opacity-50 uppercase tracking-tighter leading-tight">
                    {recruiterProfiles[type].focus}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-tighter leading-relaxed italic">
                "{recruiterProfiles[selectedType].description}"
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Form */}
        <div className="lg:col-span-8">
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 h-full flex flex-col">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Votre Profil (CV ou Accroche)</h3>
            <textarea 
              className="flex-grow w-full bg-[#0b0d11]/80 border border-white/5 rounded-3xl p-8 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm leading-relaxed mb-8 placeholder:text-gray-800"
              placeholder="Collez ici votre texte de profil ou une section de votre CV..."
              value={profileContent}
              onChange={(e) => setProfileContent(e.target.value)}
            />
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !profileContent}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-[2rem] font-black text-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-900/20 disabled:opacity-50"
            >
              {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
              {isAnalyzing ? "ANALYSE PSYCHOLOGIQUE..." : "LANCER L'AUDIT DE PERCEPTION"}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Impact Score */}
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Impact Psychologique</h4>
            <div className="text-7xl font-black text-gradient italic tracking-tighter mb-4">{result.impact}%</div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Confiance & Crédibilité</p>
          </div>

          {/* Perception Card */}
          <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5">
            <div className="flex items-start gap-4 mb-8">
              <AlertCircle className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Diagnostic de Perception</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{result.perception}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Points de Connexion</h5>
                <ul className="space-y-3">
                  {result.psychologicalTriggers.map((t: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">Biais Détectés</h5>
                <p className="text-xs text-gray-500 leading-relaxed italic">"{result.biases}"</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-3 glass-card p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Recommandations Stratégiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.recommandations.map((rec: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-black text-[10px]">
                    {i+1}
                  </div>
                  <span className="text-xs font-bold text-gray-300 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-20 p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 text-center">
        <h2 className="text-3xl font-black text-white italic tracking-tighter mb-4 uppercase">VOUS VOULEZ CONVAINCRE À TOUS LES COUPS ?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Le Plan <span className="text-blue-400 font-bold">Directeur</span> débloque l'analyse neuro-cognitive de votre CV pour chaque profil de recruteur spécifique.
        </p>
        <button className="px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all">
          PASSER EN MODE OFFENSIF
        </button>
      </div>
    </div>
  );
}
