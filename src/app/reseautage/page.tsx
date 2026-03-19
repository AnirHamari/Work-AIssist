import { UserPlus, Linkedin, MessageSquare, Calendar, Award, BookOpen, Sparkles, TrendingUp, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReseautagePage() {
  const modules = [
    {
      title: "Optimiser son profil LinkedIn",
      description: "Comment transformer votre profil en aimant à recruteurs.",
      icon: <Linkedin className="w-8 h-8 text-blue-400" />,
      tips: ["Photo professionnelle", "Titre accrocheur", "Résumé percutant", "Mise en avant des projets"],
      color: "blue"
    },
    {
      title: "Approche directe",
      description: "Modèles de messages pour aborder des professionnels sans paraître intrusif.",
      icon: <MessageSquare className="w-8 h-8 text-green-400" />,
      tips: ["Personnalisation", "Clarté de la demande", "Apport de valeur", "Suivi poli"],
      color: "green"
    },
    {
      title: "Événements & Meetups",
      description: "Réussir son networking en physique ou lors de webinaires.",
      icon: <Calendar className="w-8 h-8 text-purple-400" />,
      tips: ["Préparation", "Elevator pitch", "Écoute active", "Prise de contact post-événement"],
      color: "purple"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-transparent relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="text-center mb-24 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-float">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">L'art de l'approche directe</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 italic tracking-tighter leading-[0.9]">
          MAÎTRISEZ LE <br />
          <span className="text-gradient">RÉSEAUTAGE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
          80% des recrutements se font par le réseau. Ne soyez plus un simple candidat anonyme, devenez une recommandation évidente pour les décideurs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {modules.map((module, i) => (
          <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="mb-8 group-hover:scale-110 transition-transform relative z-10">{module.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">{module.title}</h3>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed relative z-10">{module.description}</p>
            <ul className="space-y-4 relative z-10">
              {module.tips.map((tip, j) => (
                <li key={j} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div> {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-24">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all"></div>
          <h2 className="text-4xl font-black mb-10 flex items-center gap-4 italic tracking-tight relative z-10 leading-tight">
            <BookOpen className="w-10 h-10" /> LE MESSAGE <br />D'APPROCHE "ELITE"
          </h2>
          <div className="bg-black/30 backdrop-blur-xl p-8 rounded-3xl border border-white/10 font-mono text-sm leading-relaxed mb-10 relative z-10 shadow-2xl">
            <p className="mb-4 text-white/90">"Bonjour [Prénom],</p>
            <p className="mb-4 text-white/90">Je suis [Votre Nom], expert en [Domaine]. Je suis avec beaucoup d'intérêt votre vision chez [Entreprise], notamment sur [Projet].</p>
            <p className="mb-4 text-white/90">Seriez-vous ouvert à un court échange de 15 min ? Votre expérience sur [Sujet] me permettrait d'affiner mon approche stratégique."</p>
            <p className="text-white font-black italic tracking-widest text-xs mt-6">RÉSULTAT : 85% DE TAUX DE RÉPONSE</p>
          </div>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] relative z-10 uppercase tracking-widest">
            TÉLÉCHARGER LE PACK MODÈLES
          </button>
        </div>

        <div className="glass-card p-12 rounded-[3rem] border border-white/5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative z-10">
            <Target className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight relative z-10">ACCOMPAGNEMENT DIRECTEUR</h3>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed relative z-10">
            Le Plan Directeur vous offre un accès direct à un coach réseau pour auditer vos messages d'approche et cibler les bons décideurs stratégiques.
          </p>
          <div className="space-y-6 mb-12 relative z-10">
            <div className="flex items-center gap-4 text-sm text-gray-300 font-bold">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              Audit de profil LinkedIn Expert
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300 font-bold">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              Scripts d'approche personnalisés par secteur
            </div>
          </div>
          <Link
            href="/#pricing"
            className="bg-yellow-500 text-[#0b0d11] py-5 px-8 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 relative z-10 shadow-lg shadow-yellow-500/10"
          >
            DEVENIR DIRECTEUR <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
