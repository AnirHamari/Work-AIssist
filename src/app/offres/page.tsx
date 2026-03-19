"use client";

import { useState } from "react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  Lock, 
  Globe, 
  Zap,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function OffresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [showHiddenMarket, setShowHiddenMarket] = useState(false);

  const allOffers = [
    { id: "1", title: "Développeur Frontend React", company: "Tech Solutions", location: "Paris / Remote", type: "CDI", date: "Il y a 2 jours", source: "HelloWork", hidden: false },
    { id: "2", title: "Chargé de Communication Digital", company: "Creative Agency", location: "Lyon", type: "Alternance", date: "Il y a 5 heures", source: "LinkedIn", hidden: false },
    { id: "3", title: "Data Scientist Junior", company: "Data Inc", location: "Bordeaux", type: "CDD", date: "Il y a 1 jour", source: "Indeed", hidden: false },
    { id: "4", title: "Stagiaire Assistant RH", company: "People First", location: "Nantes", type: "Stage", date: "Il y a 3 jours", source: "Welcome to the Jungle", hidden: false },
    { id: "5", title: "Directeur Marketing", company: "Confidential", location: "Paris", type: "CDI", date: "Exclusivité", source: "Marché Caché", hidden: true },
    { id: "6", title: "CTO Co-founder", company: "Stealth Startup", location: "Remote", type: "CDI", date: "Exclusivité", source: "Marché Caché", hidden: true },
    { id: "7", title: "Product Manager Senior", company: "BigTech", location: "Paris", type: "CDI", date: "Il y a 1 semaine", source: "LinkedIn", hidden: false },
    { id: "8", title: "UX Designer Junior", company: "Design Studio", location: "Marseille", type: "Alternance", date: "Il y a 2 jours", source: "Welcome to the Jungle", hidden: false },
    { id: "9", title: "Ingénieur Systèmes Électriques", company: "RTE France", location: "Saint-Denis", type: "CDI", date: "Il y a 12 heures", source: "HelloWork", hidden: false },
    { id: "10", title: "Analyste Financier", company: "BNP Paribas", location: "Paris", type: "CDI", date: "Il y a 1 jour", source: "LinkedIn", hidden: false },
    { id: "11", title: "Ingénieur Aéronautique", company: "Airbus", location: "Toulouse", type: "CDI", date: "Il y a 2 jours", source: "LinkedIn", hidden: false },
    { id: "12", title: "Chef de Projet Innovation", company: "ADP", location: "Roissy", type: "CDI", date: "Il y a 3 jours", source: "HelloWork", hidden: false },
    { id: "13", title: "Responsable Supply Chain", company: "Nestlé", location: "Issy-les-Moulineaux", type: "CDI", date: "Il y a 1 jour", source: "Indeed", hidden: false },
  ];

  const filteredOffers = allOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          offer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "Tous" || offer.type === filterType;
    const matchesHidden = showHiddenMarket ? offer.hidden : !offer.hidden;
    return matchesSearch && matchesType && matchesHidden;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#0b0d11]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 mb-4">
            <Globe className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Multi-Sources Hub</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Opportunités <span className="text-blue-500">Elite</span></h1>
          <p className="text-gray-500">Centralisation intelligente : LinkedIn, HelloWork, WTTJ & Marché Caché.</p>
        </div>
        
        <div className="flex bg-[#161b22] p-1 rounded-xl border border-gray-800">
          <button 
            onClick={() => setShowHiddenMarket(false)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!showHiddenMarket ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Public
          </button>
          <button 
            onClick={() => setShowHiddenMarket(true)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${showHiddenMarket ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {showHiddenMarket ? <Zap className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            Marché Caché
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 mb-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Poste, entreprise, mots-clés..."
              className="w-full pl-12 pr-4 py-4 bg-[#0b0d11] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              className="w-full pl-12 pr-4 py-4 bg-[#0b0d11] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Tous">Tous Contrats</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="space-y-4">
        {showHiddenMarket && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-blue-100">Vous visualisez les offres du <span className="font-bold underline decoration-blue-400 underline-offset-4">Marché Caché</span> (Réservé aux membres Senior/Directeur).</p>
            </div>
            <button className="text-xs font-black text-blue-400 uppercase tracking-widest hover:underline">En savoir plus</button>
          </div>
        )}

        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all group relative overflow-hidden">
              {offer.hidden && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              )}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-700 group-hover:border-blue-500/50 transition-colors">
                    {offer.hidden ? <Lock className="w-6 h-6 text-blue-400" /> : <Briefcase className="w-6 h-6 text-gray-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{offer.title}</h3>
                      {offer.hidden && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded uppercase tracking-tighter italic">Exclusif</span>
                      )}
                    </div>
                    <p className="text-gray-400 font-medium mb-3">{offer.company}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {offer.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {offer.type}</span>
                      <span className="flex items-center gap-1.5 font-bold text-blue-500/80">
                        <Globe className="w-3.5 h-3.5" /> {offer.source}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 md:w-auto w-full">
                  <Link
                    href={`/lettre-motivation?jobTitle=${encodeURIComponent(offer.title)}&company=${encodeURIComponent(offer.company)}`}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-all border border-gray-700"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" /> Adapter
                  </Link>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                    Postuler <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-[#161b22] rounded-3xl border border-dashed border-gray-800">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 font-medium">Aucune opportunité ne correspond à vos critères.</p>
            <button onClick={() => {setSearchTerm(""); setFilterType("Tous");}} className="mt-4 text-blue-400 text-sm font-bold hover:underline">Réinitialiser les filtres</button>
          </div>
        )}
      </div>

      {/* Premium Teaser */}
      {!showHiddenMarket && (
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">Vous manquez 60% des opportunités.</h3>
          <p className="text-gray-400 text-sm mb-6">Activez l'accès au <span className="text-blue-400 font-bold">Marché Caché</span> pour voir les offres exclusives avant tout le monde.</p>
          <Link href="/#pricing" className="px-8 py-3 bg-white text-[#0b0d11] rounded-xl font-black text-sm hover:scale-105 transition-all inline-block">
            DEVENIR SENIOR
          </Link>
        </div>
      )}
    </div>
  );
}
