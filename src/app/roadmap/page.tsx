"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, TrendingUp, Target, MapPin, Rocket, Briefcase, GraduationCap, ChevronRight, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

interface Step {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  category: "Formation" | "Action" | "Candidature";
  resources: string[];
}

export default function RoadmapPage() {
  const { data: session } = useSession();
  const [goal, setGoal] = useState("Développeur Fullstack Junior");
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Optimisation de l'Identité Numérique",
      description: "Mise à jour du profil LinkedIn et création d'un portfolio avec vos projets récents.",
      status: "completed",
      category: "Action",
      resources: ["Guide LinkedIn AIssist", "Templates Portfolio Pro"]
    },
    {
      id: 2,
      title: "Validation des Compétences Core",
      description: "Passage de certifications ou réalisation de 3 projets majeurs en React et Node.js.",
      status: "current",
      category: "Formation",
      resources: ["Cours Advanced React", "Certification Node.js"]
    },
    {
      id: 3,
      title: "Génération du CV & Lettre d'Élite",
      description: "Utilisation de Work AIssist pour créer des documents indétectables et ultra-ciblés.",
      status: "pending",
      category: "Action",
      resources: ["CV Builder Elite", "Générateur de Lettre"]
    },
    {
      id: 4,
      title: "Campagne de Candidatures Ciblées",
      description: "Cibler 10 entreprises du Marché Caché et utiliser la base de contacts VIP.",
      status: "pending",
      category: "Candidature",
      resources: ["Base 200 Contacts", "Filtres Marché Caché"]
    },
    {
      id: 5,
      title: "Simulation intensive d'Entretiens",
      description: "Pratique avec le simulateur IA pour chaque entretien décroché.",
      status: "pending",
      category: "Action",
      resources: ["Simulateur Entretien IA"]
    }
  ]);

  useEffect(() => {
    if (session) {
      fetchRoadmap();
    }
  }, [session]);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch("/api/roadmap");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setGoal(data.goal);
          setSteps(JSON.parse(data.steps));
        }
      }
    } catch (err) {
      console.error("Failed to fetch roadmap:", err);
    }
  };

  const saveRoadmap = async (updatedSteps: Step[], updatedGoal: string) => {
    if (!session) return;
    try {
      const progress = Math.round((updatedSteps.filter(s => s.status === 'completed').length / updatedSteps.length) * 100);
      await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: updatedGoal,
          steps: updatedSteps,
          progress
        })
      });
    } catch (err) {
      console.error("Failed to save roadmap:", err);
    }
  };

  const toggleStep = (id: number) => {
    const newSteps = steps.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'completed' ? 'pending' : s.status === 'pending' ? 'current' : 'completed';
        return { ...s, status: nextStatus as any };
      }
      return s;
    });
    setSteps(newSteps);
    saveRoadmap(newSteps, goal);
  };

  const progress = Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Career Strategy™</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter leading-tight">
            VOTRE <span className="text-gradient">ROADMAP</span> VERS LE SUCCÈS
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Un plan d'action chirurgical pour atteindre votre objectif professionnel. Chaque étape est validée par notre algorithme de carrière.
          </p>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border border-white/5 w-full lg:w-96">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Objectif de Carrière</h3>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-6">
            <Target className="w-8 h-8 text-blue-400" />
            <input 
              className="bg-transparent text-white font-black text-sm italic tracking-tight outline-none w-full"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onBlur={() => saveRoadmap(steps, goal)}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <span>Progression Globale</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative space-y-12">
        <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-purple-600/20 to-transparent"></div>

        {steps.map((step) => (
          <div key={step.id} className="relative pl-24 group">
            <div 
              onClick={() => toggleStep(step.id)}
              className={`absolute left-0 w-20 h-20 rounded-[2rem] flex items-center justify-center border-4 border-[#0b0d11] transition-all duration-500 cursor-pointer ${
              step.status === 'completed' 
              ? 'bg-blue-600/20 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
              : step.status === 'current'
              ? 'bg-purple-600/20 border-purple-600 animate-pulse'
              : 'bg-[#161b22] border-white/5'
            }`}>
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              ) : step.status === 'current' ? (
                <Rocket className="w-8 h-8 text-purple-400" />
              ) : (
                <Circle className="w-8 h-8 text-gray-700" />
              )}
            </div>

            <div className={`glass-card p-10 rounded-[3rem] border transition-all duration-500 hover:scale-[1.01] ${
              step.status === 'current' ? 'border-purple-500/30 shadow-2xl' : 'border-white/5'
            }`}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      step.category === 'Formation' ? 'bg-orange-500/10 text-orange-400' :
                      step.category === 'Action' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {step.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Étape {step.id}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white italic tracking-tight">{step.title}</h3>
                </div>
                <button 
                  onClick={() => toggleStep(step.id)}
                  className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    step.status === 'completed' 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30' 
                    : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {step.status === 'completed' ? 'TERMINÉ' : 'MARQUER COMME FAIT'}
                </button>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
                {step.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {step.resources.map((resource, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/res">
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover/res:text-blue-400 transition-colors" />
                    <span className="text-xs font-bold text-gray-300">{resource}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <Sparkles className="w-40 h-40 text-blue-500" />
        </div>
        <h2 className="text-3xl font-black text-white italic tracking-tighter mb-4 uppercase">Besoin d'un coup d'accélérateur ?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Le Plan <span className="text-blue-400 font-bold">Directeur</span> inclut une séance de coaching stratégique avec un expert pour valider votre roadmap.
        </p>
        <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-105 transition-all">
          PASSER AU NIVEAU SUPÉRIEUR
        </button>
      </div>
    </div>
  );
}
