"use client";

import { useState } from "react";
import { 
  Database, 
  CheckCircle, 
  Download, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Crown, 
  ArrowRight,
  Target,
  Users,
  Briefcase
} from "lucide-react";

export default function ContactsPage() {
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    const confirm = window.confirm("Voulez-vous accéder à la BDD Premium Work AIssist pour 49.99€ ?");
    if (confirm) {
      setIsPurchased(true);
    }
  };

  const sampleContacts = [
    { name: "S. Lefebvre", position: "Head of Talent", company: "Google France", sector: "Tech" },
    { name: "J. Martinez", position: "Directeur Recrutement", company: "LVMH", sector: "Luxe" },
    { name: "A. Dubois", position: "Talent Acquisition Manager", company: "Ubisoft", sector: "Gaming" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#0b0d11]">
      {/* Premium Header */}
      <div className="text-center mb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
          <Crown className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Accès Exclusif VIP</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          La Base de Données <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Premium</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Arrêtez d'envoyer des bouteilles à la mer. Contactez directement les décideurs des plus grandes entreprises. Une ressource unique, mise à jour en temps réel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Value Proposition */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800">
              <Target className="w-10 h-10 text-yellow-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Emails Directs</h3>
              <p className="text-gray-400 text-sm">Pas de adresses génériques. Vous obtenez l'email personnel professionnel du décideur.</p>
            </div>
            <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800">
              <Users className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">200+ Top Décideurs</h3>
              <p className="text-gray-400 text-sm">RH, Directeurs de département et Founders des entreprises les plus attractives.</p>
            </div>
          </div>

          <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" /> Inclus dans le Pack VIP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Emails personnels vérifiés",
                "Profils LinkedIn directs",
                "Scripts d'approche à fort taux de réponse",
                "Mises à jour gratuites pendant 1 an",
                "Secteurs : Tech, Luxe, Finance, Consulting",
                "Guide d'utilisation du Marché Caché"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table Preview */}
          <div className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-white tracking-tight uppercase text-sm">Aperçu de la BDD</h3>
              <span className="text-xs text-gray-500 italic">Dernière mise à jour : Aujourd'hui</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-800/30 text-gray-500 text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-4">Décideur</th>
                    <th className="px-6 py-4">Poste</th>
                    <th className="px-6 py-4">Entreprise</th>
                    <th className="px-6 py-4">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sampleContacts.map((contact, i) => (
                    <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-white">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{contact.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{contact.company}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-yellow-500/50 text-[10px] font-bold italic">
                          <Lock className="w-3 h-3" /> ACCÈS RESTREINT
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Premium CTA */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-[#1c2128] to-[#161b22] p-8 rounded-3xl border-2 border-yellow-500/30 sticky top-24 shadow-[0_0_50px_rgba(234,179,8,0.05)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Pack VIP Décideurs</h3>
              <p className="text-gray-500 text-sm">Investissez dans votre futur.</p>
            </div>

            <div className="mb-8 p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-white">49.99€</span>
              </div>
              <p className="text-center text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-2">Paiement unique • Accès immédiat</p>
            </div>

            <button
              onClick={handlePurchase}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all mb-6 ${
                !isPurchased 
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0b0d11] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]" 
                : "bg-green-600 text-white"
              }`}
            >
              {!isPurchased ? "DÉBLOQUER L'ACCÈS" : "TÉLÉCHARGER LA BDD"}
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Transaction chiffrée SSL</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Format Excel / CSV / PDF</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-[10px] text-blue-300 leading-tight">
                <span className="font-bold">Astuce :</span> 85% des utilisateurs ayant acheté la BDD ont obtenu un entretien en moins de 14 jours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
