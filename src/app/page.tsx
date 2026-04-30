"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Play, CheckCircle2, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid-bg min-h-screen pt-20 pb-32 relative noise">
      <div className="glow-blob glow-1" />
      <div className="glow-blob glow-2" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            V2.0 CoreShift Engine
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-10 leading-[0.85] uppercase">
            FORGE <br />
            <span className="text-neon">INTELLIGENCE.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            The world’s first autonomous content & design engine for elite events. Transform raw data into market authority in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/studio" className="group relative px-12 py-6 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
                Launch Engine <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/intelligence" className="glass px-12 py-6 rounded-full font-black text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm uppercase tracking-widest w-full sm:w-auto">
              Market Vision
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Product Preview Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="card-premium p-0 overflow-hidden bg-black/40 border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-16 lg:p-24 border-r border-white/5">
              <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-widest mb-6">
                 <div className="w-2 h-2 rounded-full bg-primary" /> Core Module 01
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">
                Multimodal <br />
                <span className="text-primary">Perception.</span>
              </h2>
              <p className="text-white/40 text-xl mb-12 leading-relaxed font-medium">
                Forge-AI doesn’t just read text—it watches your event videos. It identifies sentiment, extracts speakers, and synthesizes authority automatically.
              </p>
              <ul className="space-y-6">
                <ListItem text="Raw 4K Visual Analysis" />
                <ListItem text="Contextual Story Synthesis" />
                <ListItem text="Platform-Native Creative" />
              </ul>
            </div>
            <div className="bg-primary/5 flex items-center justify-center p-16 lg:p-0 relative group cursor-pointer overflow-hidden">
               <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(0,240,255,0.4)] relative z-20">
                  <Play className="w-10 h-10 fill-black text-black ml-1" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-10" />
               <div className="absolute bottom-12 left-12 z-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Live_Engine_Feed</p>
                  <p className="text-2xl font-black uppercase tracking-tight">BME CONCLAVE 2026</p>
               </div>
               <div className="absolute top-0 right-0 p-8 z-20">
                  <div className="glass px-3 py-1 rounded-full text-[10px] font-black text-primary animate-pulse uppercase tracking-widest">Processing...</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="container mx-auto px-6 py-20 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <BentoCard 
               icon={<Sparkles className="w-10 h-10 text-primary" />}
               title="STUDIO"
               desc="One-click social media authority kits for LinkedIn & Instagram."
            />
            <BentoCard 
               icon={<Search className="w-10 h-10 text-secondary" />}
               title="LABS"
               desc="Deep competitor research and high-value lead scoring."
            />
            <BentoCard 
               icon={<Zap className="w-10 h-10 text-accent" />}
               title="FLASH"
               desc="Zero-latency multimodal processing via Gemini 1.5."
            />
         </div>
      </section>
    </main>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4 text-base font-bold uppercase tracking-tight">
      <CheckCircle2 className="w-6 h-6 text-primary" />
      {text}
    </li>
  );
}

function BentoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="card-premium p-12 bg-black/20"
    >
      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:border-primary/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">{title}</h3>
      <p className="text-white/30 text-base leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}
