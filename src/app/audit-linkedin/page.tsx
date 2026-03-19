"use client";

import { useState } from "react";
import { Linkedin, Search, Zap, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, Eye, Target, TrendingUp, ShieldCheck } from "lucide-react";

import { useSession } from "next-auth/react";

export default function AuditLinkedInPage() {
  const { data: session } = useSession();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const saveAudit = async (auditResult: any) => {
    if (!session) return;
    try {
      await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileUrl: url,
          result: auditResult,
          score: auditResult.score
        })
      });
    } catch (err) {
      console.error("Failed to save audit:", err);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsAnalyzing(true);
    
    try {
      const res = await fetch("/api/ai/audit-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileUrl: url })
      });
      
      if (!res.ok) throw new Error("AI analysis failed");
      
      const auditResult = await res.json();
      setResult(auditResult);
      saveAudit(auditResult);
    } catch (err) {
      console.error("Audit failed:", err);
      alert("Une erreur est survenue lors de l'analyse IA. Vérifiez votre clé API.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Linkedin className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Algorithme LinkedIn Scan v4.0</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter">
          AUDIT DE PROFIL <span className="text-gradient">STRATÉGIQUE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Ne laissez pas l'algorithme LinkedIn vous ignorer. Obtenez un diagnostic complet et des recommandations actionnables pour dominer les résultats de recherche.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-4 p-2 bg-[#161b22] border border-white/5 rounded-[2.5rem] shadow-2xl">
          <input 
            type="url" 
            placeholder="Lien de votre profil (ex: linkedin.com/in/username)"
            className="flex-grow bg-transparent px-8 py-4 text-white outline-none placeholder:text-gray-700 font-medium"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button 
            disabled={isAnalyzing}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-[2rem] font-black text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
          >
            {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {isAnalyzing ? "ANALYSE EN COURS..." : "LANCER L'AUDIT"}
          </button>
        </form>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Main Score Card */}
          <div className="lg:col-span-1 glass-card p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-32 h-32 text-blue-500" />
            </div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Score de Visibilité</h3>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-blue-500" strokeDasharray={553} strokeDashoffset={553 - (553 * result.score) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-white italic tracking-tighter">{result.score}%</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Optimisé</span>
              </div>
            </div>
            <p className="mt-8 text-gray-400 text-sm leading-relaxed">
              Votre profil est plus performant que <span className="text-white font-bold">82%</span> des candidats dans votre secteur.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.metrics.map((metric: any, i: number) => (
              <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">{metric.label}</h4>
                    {metric.status === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">"{metric.tips}"</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-600">
                    <span>Performance</span>
                    <span>{metric.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${metric.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${metric.value}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Keywords Analysis */}
          <div className="lg:col-span-3 glass-card p-10 rounded-[3rem] border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Mots-clés Détectés
                </h3>
                <div className="flex flex-wrap gap-3">
                  {result.topKeywords.map((kw: string) => (
                    <span key={kw} className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-xs font-bold text-blue-400">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Mots-clés Manquants (SEO)
                </h3>
                <div className="flex flex-wrap gap-3">
                  {result.missingKeywords.map((kw: string) => (
                    <span key={kw} className="px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-xl text-xs font-bold text-purple-400">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20 p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 text-center">
        <h2 className="text-2xl font-black text-white italic tracking-tighter mb-4 uppercase">VOUS VOULEZ UN AUDIT COMPLET PAR UN EXPERT ?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Le Plan <span className="text-purple-400 font-bold">Senior</span> vous donne accès à un rapport PDF de 15 pages analysant chaque virgule de votre profil LinkedIn.
        </p>
        <button className="px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all">
          DÉBLOQUER LE RAPPORT ÉLITE
        </button>
      </div>
    </div>
  );
}
