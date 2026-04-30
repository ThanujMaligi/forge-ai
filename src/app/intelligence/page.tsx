"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Globe, RefreshCw, Check } from "lucide-react";

export default function Intelligence() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      setTimeout(() => setIsSynced(false), 3000);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-24 px-6 md:px-12 pb-24 relative noise grid-bg">
      <div className="glow-blob glow-2 opacity-10" />
      
      <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
             <div className="w-2 h-2 rounded-full bg-secondary" /> Vision Active
          </div>
          <h1 className="text-6xl font-black tracking-tighter">INTELLIGENCE<span className="text-secondary">.</span></h1>
        </div>
        <p className="text-white/30 text-sm font-bold uppercase tracking-widest border-l border-white/10 pl-6 h-10 flex items-center">Strategic Market Analysis</p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[240px] max-w-[1600px] mx-auto">
        
        {/* Main Growth Card */}
        <div className="md:col-span-8 row-span-2 card-premium relative overflow-hidden group">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                 <div>
                    <h3 className="text-3xl font-black tracking-tighter">GROWTH_VECTOR</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">BME_MARKET_TRENDS_2026</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-widest">+18.4% YOY</span>
                 </div>
              </div>
              
              <div className="h-44 flex items-end gap-3 px-2">
                 {[40, 70, 45, 90, 65, 80, 55, 75, 95, 70, 50, 85, 100, 60, 40, 70, 80, 90].map((h, i) => (
                    <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       animate={{ height: `${h}%` }}
                       transition={{ delay: i * 0.03, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                       className="flex-1 bg-white/5 group-hover:bg-secondary/40 transition-all duration-700 rounded-t-sm"
                    />
                 ))}
              </div>
           </div>
           <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 blur-[120px] -z-0" />
        </div>

        {/* Lead List */}
        <div className="md:col-span-4 row-span-3 card-premium flex flex-col bg-black/40">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Priority_Leads</h3>
              <Target className="w-4 h-4 text-secondary" />
           </div>
           <div className="flex-1 space-y-10">
              <LeadItem name="NeuroTech_X" score={98} />
              <LeadItem name="BioSync_Labs" score={94} />
              <LeadItem name="MedVision_AI" score={88} />
              <LeadItem name="Proxima_B" score={82} />
              <LeadItem name="NanoCore" score={76} />
              <LeadItem name="GenoFlux" score={68} />
           </div>
           <button 
             onClick={handleSync}
             disabled={isSyncing}
             className={`w-full mt-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2 ${isSynced ? 'bg-green-500 text-black' : 'bg-secondary text-black hover:shadow-[0_0_40px_rgba(112,0,255,0.4)]'}`}
           >
              {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : isSynced ? <Check className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
              {isSyncing ? "Syncing..." : isSynced ? "Synced" : "Sync Market Data"}
           </button>
        </div>

        {/* Google / Market Scan Section */}
        <div className="md:col-span-8 row-span-1 card-premium bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col justify-center p-12 border-secondary/20">
           <div className="flex items-center gap-10">
              <div className="w-24 h-24 rounded-full border border-secondary/30 flex items-center justify-center shrink-0 relative group">
                 <Globe className="w-10 h-10 text-secondary group-hover:rotate-180 transition-transform duration-1000" />
                 <div className="absolute inset-0 rounded-full border border-secondary/10 animate-ping" />
              </div>
              <div>
                 <h4 className="text-[10px] font-black tracking-[0.5em] text-secondary mb-3 uppercase">Market_Vision_Active</h4>
                 <h2 className="text-3xl font-black tracking-tight mb-4 uppercase">Google Neural Search Protocol</h2>
                 <p className="text-sm text-white/40 font-medium leading-relaxed max-w-xl">
                    Our system is currently crawling global medical trends to align your BME Conclave data with real-time market shifts.
                 </p>
              </div>
              <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-secondary/20" />)}
                 </div>
                 <p className="text-[10px] font-black text-secondary uppercase tracking-widest">342 Agents Scanning</p>
              </div>
           </div>
        </div>

        {/* Reach Metric */}
        <div className="md:col-span-4 row-span-1 card-premium flex items-center gap-8 bg-white/[0.01]">
           <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
              <Users className="w-8 h-8 text-white/40" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Global_Reach</p>
              <p className="text-4xl font-black tracking-tighter">1.2M+</p>
              <p className="text-[10px] font-bold text-green-500 uppercase mt-1">+12% Gain</p>
           </div>
        </div>

        <div className="md:col-span-4 row-span-1 card-premium flex items-center gap-8 bg-white/[0.01]">
           <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
              <TrendingUp className="w-8 h-8 text-white/40" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Alpha_Score</p>
              <p className="text-4xl font-black tracking-tighter">92.4</p>
              <p className="text-[10px] font-bold text-secondary uppercase mt-1">Tier_Platinum</p>
           </div>
        </div>

      </div>
    </main>
  );
}

function LeadItem({ name, score }: { name: string, score: number }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div>
        <p className="text-sm font-black tracking-widest group-hover:text-secondary transition-all uppercase">{name}</p>
        <div className="w-8 h-[1px] bg-secondary/40 mt-1 group-hover:w-full transition-all duration-500" />
      </div>
      <div className="text-right">
        <p className={`text-xl font-black tracking-tighter ${score > 90 ? "text-secondary" : "text-white/20"}`}>{score}%</p>
      </div>
    </div>
  );
}
