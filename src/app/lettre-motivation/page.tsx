"use client";

import { useState, useEffect, Suspense } from "react";
import { Send, Copy, Download, RefreshCw, User, Zap, Sparkles, Save, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { generateCoverLetterPrompt, HumanizationLevel } from "@/lib/prompts";
import { useSession } from "next-auth/react";
import Link from "next/link";

function LettreMotivationContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [userContext, setUserContext] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState<HumanizationLevel>(2);
  const [tone, setTone] = useState("Professionnel");
  const [experienceLevel, setExperienceLevel] = useState("Intermédiaire");
  const [focus, setFocus] = useState("Compétences techniques");
  const [remainingGenerations, setRemainingGenerations] = useState(3);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const title = searchParams.get("jobTitle");
    const comp = searchParams.get("company");
    if (title) setJobTitle(title);
    if (comp) setCompany(comp);
    if (title || comp) {
      setJobDescription(`Poste : ${title || "Non spécifié"}\nEntreprise : ${comp || "Non spécifiée"}`);
    }
  }, [searchParams]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (remainingGenerations <= 0) {
      setShowLimitModal(true);
      return;
    }

    setIsGenerating(true);
    
    const prompt = generateCoverLetterPrompt(
      jobTitle, 
      company, 
      jobDescription, 
      userContext, 
      humanizationLevel,
      tone,
      experienceLevel,
      focus
    );
    
    console.log("Prompt envoyé à l'IA :", prompt);

    // Simulating AI generation with longer, technical content
    setTimeout(() => {
      const mockLetter = `Objet : Candidature pour le poste de ${jobTitle || "[Poste]"} chez ${company || "[Entreprise]"} (${tone})

Madame, Monsieur,

C’est avec une réelle motivation que je vous adresse ma candidature pour le poste de ${jobTitle || "[Poste]"} au sein de ${company || "votre structure"}. En tant que profil ${experienceLevel}, j'ai suivi de près l'évolution de votre entreprise, notamment sur vos récents enjeux en [Domaine technique]. Je suis convaincu que mon expertise focalisée sur ${focus} peut apporter une valeur concrète à vos équipes.

Concrètement, lors de mes précédentes expériences, j'ai eu l'opportunité de [Action technique précise]. Du coup, j'ai développé une approche orientée résultats qui me permet de ${userContext.substring(0, 30)}... sans perdre de vue la qualité d'exécution. Dans ce contexte, intégrer une structure comme ${company || "la vôtre"} représente pour moi l'opportunité de mettre ces compétences au service de [Projet/Valeur de l'entreprise].

Ce qui m’a permis de réussir jusqu’ici, c’est avant tout ma capacité à [Autre compétence technique]. Au final, mon objectif est simple : transformer mes acquis techniques en leviers de croissance pour ${company || "votre entreprise"}. Je ne cherche pas seulement un poste, mais un environnement où mon autonomie et ma rigueur technique feront la différence dès le premier jour.

Je reste bien entendu à votre entière disposition pour un échange plus approfondi, où nous pourrons discuter de la manière dont je compte m'investir concrètement dans vos futurs projets.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Votre Nom]`;
      
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
      setRemainingGenerations(prev => prev - 1);
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert("Copié dans le presse-papier !");
  };

  const handleSave = async () => {
    if (!session) {
      alert("Veuillez vous connecter pour sauvegarder votre lettre.");
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company,
          content: generatedLetter,
        }),
      });

      if (res.ok) {
        alert("Lettre sauvegardée dans votre dashboard !");
      } else {
        alert("Erreur lors de la sauvegarde.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Intelligence Artificielle de Pointe</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter">
          VOTRE PROCHAINE <span className="text-gradient">VICTOIRE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed mb-8">
          Le recruteur n'attend pas une lettre. Il attend une évidence. Nous créons ce lien psychologique indéfectible entre vos talents et leurs besoins.
        </p>
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#161b22]/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-gray-300">Générations : <span className="text-white">{remainingGenerations}</span> / 3</span>
          </div>
          <div className="w-px h-4 bg-gray-800"></div>
          <Link href="/pricing" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
            Illimité →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form Section */}
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-32 h-32 text-blue-500" />
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="jobDescription" className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">
                  CONTEXTE DE L'OFFRE
                </label>
                <div className="relative">
                  <textarea
                    id="jobDescription"
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-[#0b0d11]/80 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-sm placeholder:text-gray-700 leading-relaxed"
                    placeholder="Collez ici l'annonce ou décrivez le poste visé..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
                    {jobDescription.length} chars
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="userContext" className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">
                  VOTRE VALEUR AJOUTÉE
                </label>
                <textarea
                  id="userContext"
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-[#0b0d11]/80 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-sm placeholder:text-gray-700 leading-relaxed"
                  placeholder="Points clés de votre parcours, réussites majeures..."
                  value={userContext}
                  onChange={(e) => setUserContext(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-1">TONALITÉ</label>
                <div className="grid grid-cols-1 gap-2">
                  {["Professionnel", "Enthousiaste", "Direct & Audacieux"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                        tone === t 
                        ? "bg-blue-600/10 border-blue-500/50 text-blue-400" 
                        : "bg-[#0b0d11]/50 border-white/5 text-gray-500 hover:border-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-1">AXE STRATÉGIQUE</label>
                <div className="grid grid-cols-1 gap-2">
                  {["Compétences techniques", "Soft Skills", "Culture d'entreprise"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFocus(f)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                        focus === f 
                        ? "bg-purple-600/10 border-purple-500/50 text-purple-400" 
                        : "bg-[#0b0d11]/50 border-white/5 text-gray-500 hover:border-white/10"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                NIVEAU D'HUMANISATION <span className="text-blue-500 ml-2">Propulsé par HumanLogic™</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { level: 1, label: "STANDARD", desc: "Clair & Pro" },
                  { level: 2, label: "AVANCÉ", desc: "Fluide & Naturel" },
                  { level: 3, label: "ÉLITE", desc: "Indétectable" },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setHumanizationLevel(item.level as HumanizationLevel)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      humanizationLevel === item.level
                        ? "border-blue-600/50 bg-blue-600/5 text-white shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                        : "border-white/5 bg-[#0b0d11]/50 text-gray-500 hover:border-white/10"
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-widest mb-1">{item.label}</span>
                    <span className="text-[9px] opacity-50 uppercase tracking-tighter">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  CALCUL DU PROMPT OPTIMAL...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  GÉNÉRER LA LETTRE D'ÉLITE
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-12 space-y-6">
          <div className="glass-card rounded-[2.5rem] border border-white/5 min-h-[700px] flex flex-col overflow-hidden relative">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <span className="ml-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Document_Final.pdf</span>
              </div>
              <div className="flex items-center gap-3">
                {generatedLetter && (
                  <>
                    <button onClick={copyToClipboard} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white" title="Copier">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white" title="Sauvegarder">
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-grow p-10 font-serif leading-relaxed text-gray-300 overflow-y-auto bg-[#0d1117]/50">
              {generatedLetter ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 whitespace-pre-wrap text-sm sm:text-base">
                  {generatedLetter}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                  <div className="w-24 h-32 border-2 border-dashed border-gray-500 rounded-lg flex flex-col p-4 gap-2">
                    <div className="w-full h-2 bg-gray-500 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-500 rounded"></div>
                    <div className="w-full h-2 bg-gray-500 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-500 rounded"></div>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest">Prêt pour la génération</p>
                </div>
              )}
            </div>

            {generatedLetter && (
              <div className="p-6 bg-blue-600 text-center cursor-pointer hover:bg-blue-500 transition-all">
                <button className="flex items-center justify-center gap-2 w-full text-xs font-black uppercase tracking-[0.2em] text-white">
                  <Download className="w-4 h-4" /> Télécharger au format PDF
                </button>
              </div>
            )}
          </div>
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" /> Analyse AIssist
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Votre lettre utilise un ton <span className="text-blue-400 font-bold">{tone}</span> avec un focus sur <span className="text-purple-400 font-bold">{focus}</span>. 
              L'algorithme a injecté 12 variations syntaxiques pour garantir l'humanisation.
            </p>
          </div>
        </div>
      </div>

      {/* Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-10 rounded-[2.5rem] border border-blue-500/30 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <Lock className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-white mb-4 italic">LIMITE ATTEINTE</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Vous avez utilisé vos 3 générations gratuites. Pour continuer à dominer le marché avec l'IA Élite, passez au plan supérieur.
            </p>
            <Link 
              href="/pricing" 
              className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-50 hover:text-blue-900 transition-all mb-4"
            >
              VOIR LES PLANS PREMIUM
            </Link>
            <button 
              onClick={() => setShowLimitModal(false)}
              className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white"
            >
              Plus tard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LettreMotivationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Chargement...</div>}>
      <LettreMotivationContent />
    </Suspense>
  );
}
