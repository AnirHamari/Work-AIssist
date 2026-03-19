"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Database, 
  Search, 
  TrendingUp, 
  Linkedin, 
  Award, 
  Zap,
  CheckCircle2,
  Lock,
  MessageSquare,
  RefreshCw,
  Crown,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const stats = [
    { label: "Générations IA", value: "12,400+", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { label: "Contacts VIP", value: "2,500+", icon: <Database className="w-4 h-4 text-blue-400" /> },
    { label: "Jobs Décrochés", value: "850+", icon: <Award className="w-4 h-4 text-green-400" /> },
  ];

  const handleAnalyzeLinkedIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult("Votre profil est solide, mais votre 'About' manque de mots-clés stratégiques. Suggestions : 'Expert en IA', 'Optimisation de process'. Votre réseau est de 450 personnes, visez les 500+ pour l'algorithme.");
      setIsAnalyzing(false);
    }, 2000);
  };

  const subscriptionPlans = [
    {
      name: "Junior",
      price: "0€",
      features: ["3 générations de lettres / mois", "CV Builder standard", "Tips de base", "Accès offres publiques"],
      cta: "Commencer Gratuitement",
      highlight: false
    },
    {
      name: "Senior",
      price: "19.99€/mois",
      features: ["Générations illimitées", "CV Premium (Multi-templates)", "Analyse profil LinkedIn IA", "Support prioritaire", "Accès marché caché"],
      cta: "Passer en Senior",
      highlight: true
    },
    {
      name: "Directeur",
      price: "49.99€/mois",
      features: ["Tout le plan Senior", "Accès BDD Contacts VIP (Offert)", "Coaching réseau personnalisé", "Audit CV par expert", "Relances automatiques IA"],
      cta: "Devenir Directeur",
      highlight: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0d11]">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Decorative Image */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-gradient-to-l from-[#0b0d11] to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
            alt="Abstract Tech" 
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">L'IA de recrutement n°1</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            HACKEZ VOTRE<br />
            <span className="text-gradient italic">CARRIÈRE</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Le marché ne vous attend pas, il vous subit. Work <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">AIssist</span> transforme vos candidatures en arguments de vente imparables. Ne cherchez plus un job, devenez la solution qu'ils s'arrachent.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <Link href="/lettre-motivation" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all flex items-center gap-3 group">
              PASSER À L'ACTION <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/offres" className="px-10 py-5 bg-[#161b22]/80 backdrop-blur-md text-white rounded-2xl font-black text-xl hover:bg-gray-800 transition-all border border-gray-800 flex items-center gap-3">
              OFFRES VIP
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto border-t border-gray-800/50 pt-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 glass-card rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-[#0e1117]/50 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">UNE SUITE <span className="text-blue-500">OFFENSIVE</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Chaque outil est conçu pour vous donner un avantage déloyal sur les autres candidats.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Lettres IA Haute-Précision", 
                desc: "Générez des lettres ultra-techniques qui parlent le langage de l'entreprise. 100% indétectable par les filtres IA.",
                icon: <Sparkles className="w-8 h-8 text-blue-400" />,
                link: "/lettre-motivation"
              },
              { 
                title: "CV Builder Executive", 
                desc: "Exportez des CVs au design minimaliste et puissant. L'IA adapte votre contenu à chaque offre en un clic.",
                icon: <FileText className="w-8 h-8 text-purple-400" />,
                link: "/cv"
              },
              { 
                title: "BDD Contacts VIP", 
                desc: "Accédez à plus de 200 emails directs de décideurs (RH, CEO, CTO). Cassez les codes du recrutement classique.",
                icon: <Database className="w-8 h-8 text-yellow-400" />,
                link: "/contacts"
              },
              { 
                title: "Le Marché Caché", 
                desc: "Découvrez des opportunités exclusives non publiées sur les plateformes classiques. Soyez le premier sur le coup.",
                icon: <Lock className="w-8 h-8 text-red-400" />,
                link: "/offres"
              },
              { 
                title: "Audit LinkedIn IA", 
                desc: "Analysez votre profil et recevez des corrections immédiates pour apparaître dans le top des recherches recruteurs.",
                icon: <Linkedin className="w-8 h-8 text-blue-600" />,
                link: "/audit-linkedin"
              },
              { 
                title: "Réseautage Stratégique", 
                desc: "Apprenez l'art de l'approche directe avec nos scripts d'élite testés et approuvés par des experts.",
                icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                link: "/reseautage"
              }
            ].map((feature, i) => (
              <Link key={i} href={feature.link} className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/50 transition-all group overflow-hidden relative">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all shadow-inner relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 relative z-10">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] group-hover:gap-4 transition-all relative z-10">
                  Explorer l'outil <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-12">Ils recrutent nos membres</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {["LICORNES TECH", "CABINETS CONSEIL", "GROUPE LUXE", "BANQUES PRIVÉES", "SOLUTIONS SAAS", "LOGISTIQUE"].map((partner) => (
              <span key={partner} className="text-2xl font-black text-white italic tracking-tighter">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-32 px-4 bg-[#0b0d11]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">VRAIES CARRIÈRES. <span className="text-gradient">VRAIS IMPACTS.</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic font-medium">Pas de promesses en l'air. Juste des trajectoires qui s'accélèrent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Lucas M.", 
                role: "Développeur Fullstack", 
                company: "Leader Aérospatial",
                text: "Avant AIssist, j'étais transparent. Aujourd'hui, je suis chassé toutes les semaines. Ma lettre a fait mouche dès la première lecture.",
                plan: "Senior"
              },
              { 
                name: "Sarah D.", 
                role: "Chef de Projet", 
                company: "Groupe Cosmétique",
                text: "J'ai arrêté de postuler sur les portails. La base de contacts m'a permis de parler au bon décideur en 48h.",
                plan: "Directeur"
              },
              { 
                name: "Karim B.", 
                role: "Alternant Marketing", 
                company: "Scale-up IA",
                text: "Le simulateur d'entretien m'a appris à transformer mon manque d'expérience en soif d'apprendre. Ça a tout changé.",
                plan: "Junior"
              }
            ].map((story, i) => (
              <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/5 relative group hover:scale-105 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-black text-white">
                    {story.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight">{story.name}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{story.role} @ {story.company}</p>
                  </div>
                </div>
                <div className="relative">
                  <MessageSquare className="absolute -top-4 -left-4 w-8 h-8 text-blue-500/10" />
                  <p className="text-gray-400 text-sm leading-relaxed italic mb-8 relative z-10">"{story.text}"</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full w-fit">
                  <Crown className="w-3 h-3 text-yellow-500" />
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Membre {story.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Subscriptions */}
      <section className="py-24 px-4 bg-[#0b0d11]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choisissez votre plan</h2>
            <p className="text-gray-500">De l'étudiant au cadre dirigeant, nous avons l'outil qu'il vous faut.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border ${plan.highlight ? 'bg-[#1c2128] border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.1)]' : 'bg-[#161b22] border-gray-800'} transition-all hover:scale-[1.02]`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    Plus Populaire
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-black text-white mb-8">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                      <CheckCircle2 className={`w-4 h-4 ${plan.highlight ? 'text-blue-500' : 'text-gray-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section className="py-32 px-4 bg-[#0b0d11]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Linkedin className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Audit de Profil IA</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">VOTRE PROFIL EST-IL <span className="text-purple-500">PRÊT ?</span></h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Notre IA analyse votre présence sur LinkedIn et détecte instantanément les failles qui vous font rater des entretiens. SEO, mots-clés, structure du résumé... ne laissez rien au hasard.
              </p>
              
              <form onSubmit={handleAnalyzeLinkedIn} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="url" 
                  placeholder="Lien de votre profil LinkedIn"
                  className="flex-grow bg-[#161b22] border border-gray-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-2xl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  required
                />
                <button 
                  disabled={isAnalyzing}
                  className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-sm hover:bg-purple-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-600/20"
                >
                  {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  {isAnalyzing ? "ANALYSE..." : "LANCER L'AUDIT"}
                </button>
              </form>

              {analysisResult && (
                <div className="mt-8 p-8 glass-card rounded-3xl border border-purple-500/30 animate-fade-in relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <Sparkles className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-100 leading-relaxed mb-6 font-medium">{analysisResult}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-purple-500/20 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-widest border border-purple-500/30">Action Immédiate</span>
                        <span className="px-3 py-1 bg-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/30">Optimisation SEO</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[100px] group-hover:blur-[120px] transition-all rounded-full pointer-events-none"></div>
              <div className="relative glass-card p-4 rounded-[3rem] border border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <div className="bg-[#0b0d11] rounded-[2.5rem] p-8 aspect-square flex flex-col justify-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 italic">SCORE DE VISIBILITÉ</h3>
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tighter">82%</div>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Analyse en temps réel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
