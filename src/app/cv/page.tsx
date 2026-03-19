"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Download, Eye, Save, RefreshCw, Sparkles, Zap } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useSession } from "next-auth/react";

export default function CVPage() {
  const { data: session } = useSession();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cvJobContext, setCvJobContext] = useState("");
  const [template, setTemplate] = useState<"Executive" | "Creative" | "Academic">("Executive");

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
  });

  const [experiences, setExperiences] = useState([{ company: "", position: "", duration: "", description: "" }]);
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [skills, setSkills] = useState([""]);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handleGenerateCVContent = async () => {
    if (!cvJobContext) return alert("Veuillez saisir le contexte de l'offre.");
    setIsGenerating(true);
    
    // Simulate AI CV generation
    setTimeout(() => {
      const optimizedExperiences = [
        { 
          company: "Optimisé par AIssist", 
          position: "Poste Adapté", 
          duration: "2024", 
          description: "Pilotage stratégique des indicateurs clés... Optimisation des processus métier... Leadership technique..." 
        }
      ];
      setExperiences(optimizedExperiences);
      setSkills(["Expertise IA", "Stratégie", "Data Analysis"]);
      setIsGenerating(false);
      alert("Contenu du CV optimisé pour l'offre !");
    }, 2000);
  };

  const handleSave = async () => {
    if (!session) {
      alert("Veuillez vous connecter pour sauvegarder votre CV.");
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/cvs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: personalInfo.title || "Mon CV",
          content: {
            personalInfo,
            experiences,
            education,
            skills,
          },
        }),
      });

      if (res.ok) {
        alert("CV sauvegardé dans votre dashboard !");
      } else {
        alert("Erreur lors de la sauvegarde.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => setExperiences([...experiences, { company: "", position: "", duration: "", description: "" }]);
  const addEducation = () => setEducation([...education, { school: "", degree: "", year: "" }]);
  const addSkill = () => setSkills([...skills, ""]);

  const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index));
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#050608] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 -z-10 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 -z-10 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Design System Propriétaire</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter">
          VOTRE <span className="text-gradient">PRÉCISION CHIRURGICALE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
          Le CV n'est plus un historique. C'est votre feuille de route vers le succès. Optimisez chaque pixel pour captiver l'attention en moins de 6 secondes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          <div className="glass-card p-6 rounded-[2rem] border border-white/5 space-y-8">
            {/* Template Selector */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-3 h-3" /> Choix du Template
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {(["Executive", "Creative", "Academic"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between group ${
                      template === t 
                      ? "bg-blue-600/10 border-blue-500/50 text-blue-400" 
                      : "bg-[#0b0d11]/50 border-white/5 text-gray-500 hover:border-white/10"
                    }`}
                  >
                    {t}
                    {template === t && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Optimizer */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> AI Optimizer™
              </h3>
              <textarea 
                placeholder="Collez l'annonce ici..."
                className="w-full bg-[#0b0d11]/80 border border-white/5 rounded-xl p-4 text-xs text-white outline-none focus:ring-2 focus:ring-blue-500/50 h-32 leading-relaxed"
                value={cvJobContext}
                onChange={(e) => setCvJobContext(e.target.value)}
              />
              <button 
                onClick={handleGenerateCVContent}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isGenerating ? "OPTIMISATION..." : "ADAPTER LE CONTENU"}
              </button>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter leading-tight">
                PRO-TIP: Le template <span className="text-white italic">Executive</span> est recommandé pour les secteurs Finance et Tech.
              </p>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-5 space-y-8 glass-card p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
          <div className="absolute top-10 right-10 text-[60px] font-black text-white/[0.02] pointer-events-none select-none italic">
            EDITOR
          </div>

          <form className="space-y-12 relative z-10">
            {/* Identity */}
            <section className="space-y-6">
              <h2 className="text-sm font-black text-white flex items-center gap-4 uppercase tracking-[0.3em]">
                <span className="w-10 h-10 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center text-[10px] font-black italic border border-blue-500/20">01</span>
                Identité Visuelle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">NOM COMPLET</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-[#0b0d11]/80 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm placeholder:text-gray-800"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">TITRE CIBLE</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-[#0b0d11]/80 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm placeholder:text-gray-800"
                    value={personalInfo.title}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">EMAIL</label>
                  <input
                    type="email"
                    className="w-full p-4 bg-[#0b0d11]/80 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm placeholder:text-gray-800"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">TÉLÉPHONE</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-[#0b0d11]/80 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm placeholder:text-gray-800"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* Experiences */}
            <section className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-sm font-black text-white flex items-center gap-4 uppercase tracking-[0.3em]">
                  <span className="w-10 h-10 bg-green-600/10 text-green-400 rounded-2xl flex items-center justify-center text-[10px] font-black italic border border-green-500/20">02</span>
                  Expériences
                </h2>
                <button type="button" onClick={addExperience} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" /> AJOUTER
                </button>
              </div>
              
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="p-6 bg-[#0b0d11]/50 border border-white/5 rounded-[2rem] relative group/item hover:border-white/10 transition-all">
                    <button type="button" onClick={() => removeExperience(index)} className="absolute top-6 right-6 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <input
                        type="text"
                        placeholder="ENTREPRISE"
                        className="bg-transparent border-b border-white/5 p-2 text-white outline-none focus:border-blue-500 transition-all text-xs font-bold uppercase tracking-widest placeholder:text-gray-800"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].company = e.target.value;
                          setExperiences(newExp);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="DURÉE"
                        className="bg-transparent border-b border-white/5 p-2 text-white outline-none focus:border-blue-500 transition-all text-xs font-bold uppercase tracking-widest placeholder:text-gray-800"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].duration = e.target.value;
                          setExperiences(newExp);
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Missions & Impacts (L'IA peut optimiser cela)..."
                      className="w-full p-4 bg-[#0b0d11]/80 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-blue-500/50 h-28 text-sm leading-relaxed placeholder:text-gray-800"
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...experiences];
                        newExp[index].description = e.target.value;
                        setExperiences(newExp);
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-sm font-black text-white flex items-center gap-4 uppercase tracking-[0.3em]">
                  <span className="w-10 h-10 bg-purple-600/10 text-purple-400 rounded-2xl flex items-center justify-center text-[10px] font-black italic border border-purple-500/20">03</span>
                  Compétences
                </h2>
                <button type="button" onClick={addSkill} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" /> AJOUTER
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-[#0b0d11]/80 px-4 py-2 rounded-xl border border-white/5 group/skill">
                    <input
                      type="text"
                      placeholder="Compétence"
                      className="bg-transparent outline-none text-xs text-white w-24 placeholder:text-gray-800"
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index] = e.target.value;
                        setSkills(newSkills);
                      }}
                    />
                    <button type="button" onClick={() => removeSkill(index)} className="text-gray-600 hover:text-red-500 opacity-0 group-skill:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col min-h-[750px] relative">
            {/* Toolbar */}
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={isSaving} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white" title="Sauvegarder">
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </button>
                <button onClick={() => handlePrint()} className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all text-white" title="Exporter PDF">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actual CV Preview Rendering */}
            <div className="flex-grow p-0 overflow-auto bg-[#f8f9fa] text-[#1a1a1a] shadow-inner">
              <div ref={componentRef} className={`w-full h-full min-h-[1122px] p-12 bg-white origin-top transition-all duration-500 ${
                template === "Creative" ? "font-sans" : "font-serif"
              }`}>
                {/* Executive Template */}
                {template === "Executive" && (
                  <div className="space-y-10">
                    <header className="border-b-4 border-gray-900 pb-8 text-center">
                      <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{personalInfo.name || "VOTRE NOM"}</h1>
                      <p className="text-xl text-blue-700 font-bold uppercase tracking-widest">{personalInfo.title || "TITRE PROFESSIONNEL"}</p>
                      <div className="mt-4 flex justify-center gap-6 text-[10px] font-bold text-gray-500 uppercase">
                        <span>{personalInfo.email}</span>
                        <span>•</span>
                        <span>{personalInfo.phone}</span>
                      </div>
                    </header>
                    
                    <section className="grid grid-cols-12 gap-10">
                      <div className="col-span-8 space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] border-b border-gray-200 pb-2">Expériences</h2>
                        {experiences.map((exp, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-black uppercase text-sm">{exp.position || "Poste"}</h3>
                              <span className="text-[10px] font-bold text-gray-400">{exp.duration}</span>
                            </div>
                            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{exp.company}</p>
                            <p className="text-xs text-gray-600 leading-relaxed text-justify whitespace-pre-wrap">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="col-span-4 space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] border-b border-gray-200 pb-2">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((s, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-black uppercase">{s}</span>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* Creative Template Placeholder */}
                {template === "Creative" && (
                  <div className="flex h-full gap-0">
                    <div className="w-1/3 bg-gray-900 text-white p-10 flex flex-col gap-10">
                      <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-blue-500 mx-auto"></div>
                      <div className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-blue-400">Contact</h2>
                        <p className="text-[10px] opacity-70 break-all">{personalInfo.email}</p>
                        <p className="text-[10px] opacity-70">{personalInfo.phone}</p>
                      </div>
                    </div>
                    <div className="w-2/3 p-10 space-y-10">
                      <header>
                        <h1 className="text-5xl font-black text-gray-900 leading-none">{personalInfo.name || "NOM"}</h1>
                        <p className="text-lg font-light text-gray-500 mt-2">{personalInfo.title || "TITRE"}</p>
                      </header>
                      <div className="space-y-6">
                        <h2 className="text-xl font-black border-l-4 border-blue-500 pl-4">Parcours</h2>
                        {experiences.map((exp, i) => (
                          <div key={i} className="space-y-1">
                            <h3 className="font-bold">{exp.position}</h3>
                            <p className="text-xs text-blue-600">{exp.company}</p>
                            <p className="text-xs text-gray-500 whitespace-pre-wrap">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Academic Template Placeholder */}
                {template === "Academic" && (
                   <div className="space-y-8 max-w-[90%] mx-auto py-10">
                      <div className="text-center space-y-2">
                        <h1 className="text-2xl font-serif italic">{personalInfo.name || "NOM COMPLET"}</h1>
                        <p className="text-xs font-serif uppercase tracking-widest border-y border-gray-200 py-2">{personalInfo.title || "TITRE"}</p>
                      </div>
                      <div className="space-y-6">
                        <h2 className="text-sm font-serif italic border-b border-gray-200 pb-1">Professional Experience</h2>
                        {experiences.map((exp, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between font-serif text-xs italic">
                              <span>{exp.company}, {exp.position}</span>
                              <span>{exp.duration}</span>
                            </div>
                            <p className="text-xs font-serif leading-relaxed text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-600/5 border border-blue-500/10 backdrop-blur-sm">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Score ATS AIssist
            </h4>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
              <div className="w-[85%] h-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Votre document est optimisé à <span className="text-white font-bold">85%</span> pour les lecteurs automatiques. 
              <span className="text-blue-400 underline ml-1 cursor-pointer">Comment atteindre 100% ?</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
