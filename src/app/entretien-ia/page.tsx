"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Play, RotateCcw, MessageSquare, Award, AlertCircle, Sparkles, ChevronRight, User, Bot } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
  feedback?: string;
  score?: number;
}

export default function EntretienIAPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Intermédiaire");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startSimulation = () => {
    if (!jobTitle) return alert("Veuillez spécifier un poste.");
    setIsStarted(true);
    const initialMessage: Message = {
      role: "bot",
      content: `Bonjour ! Je suis votre recruteur virtuel pour le poste de ${jobTitle}. Nous allons commencer cet entretien. Pouvez-vous vous présenter brièvement et m'expliquer pourquoi vous avez postulé chez nous ?`
    };
    setMessages([initialMessage]);
  };

  const saveSimulation = async (finalMessages: Message[]) => {
    if (!session) return;
    try {
      const lastBotMsg = [...finalMessages].reverse().find(m => m.role === 'bot');
      await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          messages: finalMessages,
          score: lastBotMsg?.score || 0
        })
      });
    } catch (err) {
      console.error("Failed to save simulation:", err);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || isProcessing) return;

    const userMsg: Message = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/ai/entretien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          jobTitle, 
          difficulty, 
          messages: updatedMessages 
        })
      });
      
      if (!res.ok) throw new Error("AI analysis failed");
      
      const botResponse = await res.json();
      const finalMessages = [...updatedMessages, { ...botResponse, role: "bot" }];
      setMessages(finalMessages);
      saveSimulation(finalMessages);
    } catch (err) {
      console.error("Interview message failed:", err);
      alert("Une erreur est survenue lors de l'analyse IA. Vérifiez votre clé API.");
    } finally {
      setIsProcessing(true); // Small hack to match the previous structure if needed, or set to false
      setIsProcessing(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulation de transcription vocale
    if (!isRecording) {
      setTimeout(() => {
        setUserInput("Je pense que ma principale force est ma capacité d'adaptation...");
        setIsRecording(false);
      }, 3000);
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
          <Award className="w-4 h-4 text-green-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Simulation d'Entretien Immersive</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter">
          DOMINEZ VOS <span className="text-gradient">ENTRETIENS</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Pratiquez avec notre IA entraînée sur les processus de recrutement des plus grandes entreprises. Recevez un feedback instantané sur vos réponses.
        </p>

        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 max-w-xl mx-auto text-left space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Poste visé</label>
            <input 
              type="text" 
              placeholder="ex: Développeur Fullstack, Chef de Projet..."
              className="w-full bg-[#0b0d11]/80 border border-white/5 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Niveau de difficulté</label>
            <div className="grid grid-cols-3 gap-3">
              {["Standard", "Intermédiaire", "Elite"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === d 
                    ? "bg-blue-600/10 border-blue-500/50 text-blue-400" 
                    : "bg-[#0b0d11]/50 border-white/5 text-gray-500 hover:border-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startSimulation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-blue-900/20"
          >
            <Play className="w-5 h-5 fill-current" />
            LANCER LA SIMULATION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white italic tracking-tight uppercase">Simulation : {jobTitle}</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Recruteur Virtuel AIssist</p>
          </div>
        </div>
        <button 
          onClick={() => {setIsStarted(false); setMessages([]);}}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> REFAIRE
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-hide"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-[#161b22] text-gray-300 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-[#161b22] p-5 rounded-2xl rounded-tl-none border border-white/5 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <button 
                type="button"
                onClick={toggleRecording}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <input 
                type="text" 
                placeholder="Votre réponse ici..."
                className="flex-grow bg-[#0b0d11]/80 border border-white/5 rounded-2xl px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/50"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
          <div className="glass-card p-6 rounded-[2rem] border border-white/5 space-y-6">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Feedback Hub
            </h3>
            
            {messages.length > 1 && messages[messages.length-1].role === 'bot' ? (
              <div className="space-y-6 animate-in fade-in duration-700">
                <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Score de réponse</span>
                    <span className="text-2xl font-black text-blue-400 italic">{messages[messages.length-1].score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${messages[messages.length-1].score}%` }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <p className="leading-relaxed italic">"{messages[messages.length-1].feedback}"</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Conseil Expert</h4>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      "Utilisez la méthode **STAR** (Situation, Task, Action, Result) pour structurer vos exemples. C'est le standard de l'industrie."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-center opacity-20">
                <MessageSquare className="w-12 h-12 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">En attente de réponse...</p>
              </div>
            )}
          </div>

          <div className="p-6 rounded-[2rem] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/5">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" /> Plan Senior
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
              Débloquez l'analyse vocale par IA pour corriger votre ton et vos tics de langage.
            </p>
            <button className="w-full py-2 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
              UPGRADER →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
