"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Send, Sparkles, Loader2, Play, Image as ImageIcon, CheckCircle2, Copy, Check, X, ExternalLink, Cpu, Link as LinkIcon } from "lucide-react";
import { forgeContent } from "../actions/forge";
import Link from "next/link";

export default function Studio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("linkedin");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setGeneratedContent(null); // Force re-forge for new platform
  };
  const [step, setStep] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [targetAsset, setTargetAsset] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fileName, setFileName] = useState("BME_CONCLAVE_MASTER.RAW");
  const [isLinking, setIsLinking] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<"image" | "video" | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "INITIALIZING_GEMINI_1.5_PRO",
    "BUFFERING_MULTIMODAL_STREAM",
    "EXTRACTING_NEURAL_TOKENS",
    "SYNTHESIZING_BRAND_VOICE",
    "FINALIZING_CORE_OUTPUT"
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(0);
    setIsPublished(false);
    
    // Animate steps while the server action runs
    const stepInterval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const result = await forgeContent(activeTab, targetAsset || fileName);
      setGeneratedContent(result);
    } catch (error) {
      console.error("Forge Error:", error);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(`${generatedContent.title}. ${generatedContent.body}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 relative noise grid-bg">
      <div className="glow-blob glow-1 opacity-10" />
      
      <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
             <Cpu className="w-3 h-3" /> Gemini 1.5 Pro Online
          </div>
          <h1 className="text-7xl font-black tracking-tighter">STUDIO<span className="text-primary">.</span></h1>
        </div>
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] border-l border-white/10 pl-8">Multimodal Ingestion Engine</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const file = e.target.files[0];
                setFileName(file.name);
                setPreviewUrl(URL.createObjectURL(file));
                setAssetType(file.type.startsWith("video") ? "video" : "image");
                setShowPreview(true);
              }
            }} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="card-premium border-dashed bg-white/[0.01] flex flex-col items-center justify-center py-20 text-center group cursor-pointer active:scale-95 transition-all"
            >
              <Upload className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-xl font-black uppercase tracking-widest mb-2">Local Asset</p>
              <p className="text-[10px] text-white/30 font-bold">Manual Upload</p>
            </div>

            <div className="card-premium bg-white/[0.01] flex flex-col items-center justify-center py-20 text-center group relative overflow-hidden border-dashed border-white/10 hover:border-primary/50 transition-all">
              {!isLinking ? (
                <div onClick={() => setIsLinking(true)} className="cursor-pointer flex flex-col items-center">
                  <LinkIcon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <p className="text-xl font-black uppercase tracking-widest mb-2">Drive Link</p>
                  <p className="text-[10px] text-white/30 font-bold">Paste URL</p>
                </div>
              ) : (
                <div className="w-full px-6 flex flex-col items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Paste Drive URL..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-bold text-white placeholder:text-white/20 focus:border-primary/50 outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const target = e.target as HTMLInputElement;
                        if (target.value) {
                          const url = target.value;
                          setFileName(url.split('/').pop() || "Cloud Asset");
                          
                          // Drive Preview Logic
                          const driveIdMatch = url.match(/[-\w]{25,}/);
                          if (driveIdMatch && url.includes("drive.google.com")) {
                             setPreviewUrl(`https://drive.google.com/file/d/${driveIdMatch[0]}/preview`);
                             setAssetType(url.toLowerCase().includes("video") || url.toLowerCase().includes(".mp4") ? "video" : "image");
                             setShowPreview(true);
                             setActiveTab("media"); // Auto-switch to media view
                          }
                          setIsLinking(false);
                        }
                      }
                    }}
                    onBlur={() => setIsLinking(false)}
                  />
                  <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">Press Enter to Sync</p>
                </div>
              )}
            </div>
          </div>

          <div className="card-premium space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Target Specific Asset</h3>
            <input 
              type="text" 
              placeholder="e.g. 5I4A1262.JPG"
              value={targetAsset}
              onChange={(e) => setTargetAsset(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-xs font-bold text-primary placeholder:text-white/10 focus:border-primary/50 outline-none transition-all"
            />
            <p className="text-[8px] text-white/20 font-medium">If using a folder link, specify the exact filename to analyze above.</p>
          </div>

          <div className="card-premium py-4 px-6 flex items-center justify-between bg-primary/5 border-primary/20">
            <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Source Context</p>
              <p className="text-[10px] text-primary font-black truncate max-w-[150px]">{targetAsset || fileName}</p>
            </div>
            {previewUrl && (
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="bg-primary/20 hover:bg-primary/40 text-primary px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
              >
                {showPreview ? "Hide View" : "View Asset"}
              </button>
            )}
          </div>

          {previewUrl && showPreview && (
            <div className="card-premium p-0 overflow-hidden group relative h-48 border-primary/30">
               {assetType === "video" && previewUrl.includes("drive.google.com") ? (
                  <iframe src={previewUrl} className="w-full h-full border-0" allow="autoplay" />
               ) : assetType === "video" ? (
                  <video src={previewUrl} className="w-full h-full object-cover" controls />
               ) : (
                  <img src={previewUrl} alt="Asset Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               )}
               <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Live Preview</div>
            </div>
          )}

          <div className="card-premium">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 flex items-center justify-between">
               Processing Parameters
               <Sparkles className="w-4 h-4 text-primary" />
            </h3>
            <div className="space-y-6">
               <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-primary text-black py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  {isGenerating ? "FORGING..." : "INITIATE AI FORGE"}
                </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="card-premium h-[760px] flex flex-col p-0 overflow-hidden bg-black/60 relative">
            <div className="flex border-b border-white/5 bg-white/[0.03]">
              <TabButton active={activeTab === "linkedin"} onClick={() => handleTabChange("linkedin")} label="LINKEDIN" />
              <TabButton active={activeTab === "instagram"} onClick={() => handleTabChange("instagram")} label="INSTAGRAM" />
              <TabButton active={activeTab === "casestudy"} onClick={() => handleTabChange("casestudy")} label="REPORTS" />
              <TabButton active={activeTab === "media"} onClick={() => setActiveTab("media")} label="MEDIA" />
            </div>
            
            <div className="flex-1 p-16 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === "media" ? (
                  <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                         <div className="w-full h-full max-h-[500px] border border-white/10 rounded-3xl overflow-hidden bg-black/40 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            {assetType === "video" && previewUrl.includes("drive.google.com") ? (
                               <iframe src={previewUrl} className="w-full h-full border-0" allow="autoplay" />
                            ) : assetType === "video" ? (
                               <video src={previewUrl} className="w-full h-full object-contain" controls />
                            ) : (
                               <img src={previewUrl} alt="Full Asset Preview" className="w-full h-full object-contain" />
                            )}
                         </div>
                         <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-primary">{fileName}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center opacity-20">
                         <ImageIcon className="w-12 h-12 mb-4" />
                         <p className="text-sm font-black uppercase tracking-[0.5em]">No Asset to Preview</p>
                      </div>
                    )}
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center">
                    <div className="w-56 h-[2px] bg-white/5 relative overflow-hidden mb-16">
                       <motion.div className="absolute inset-0 bg-primary" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    </div>
                    <div className="space-y-4">
                       {steps.map((s, i) => (
                         <div key={i} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${i === step ? "text-primary opacity-100 scale-105" : i < step ? "text-green-500 opacity-60" : "text-white/5 opacity-10"}`}>
                            {i < step ? ">> SUCCESS " : i === step ? ">> PROCESSING " : ">> PENDING "} {s}
                         </div>
                       ))}
                    </div>
                  </motion.div>
                ) : generatedContent ? (
                  <motion.div key="output" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                    <div className="space-y-10 relative">
                       <h2 className="text-6xl font-black tracking-tighter leading-none uppercase">
                          {generatedContent.title}<span className="text-primary">.</span>
                       </h2>
                       <div className="space-y-8 text-white/50 text-xl font-medium leading-relaxed max-w-2xl">
                          <p>{generatedContent.body}</p>
                          <div className="p-10 border-l-4 border-primary bg-primary/5 italic text-white/90 rounded-r-3xl">
                             &quot;{generatedContent.quote}&quot;
                          </div>
                          <p className="text-primary font-black tracking-[0.5em] text-sm uppercase">{generatedContent.hashtags}</p>
                       </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-10">
                      <button onClick={handleCopy} className="flex-1 glass py-6 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-3 transition-all active:scale-95">
                        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {isCopied ? "COPIED" : "COPY RAW DRAFT"}
                      </button>
                      <button onClick={handlePublish} disabled={isPublished} className={`flex-1 py-6 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${isPublished ? 'bg-green-500 text-black shadow-[0_0_40px_rgba(34,197,94,0.3)]' : 'bg-primary text-black shadow-[0_0_40px_rgba(0,240,255,0.3)]'}`}>
                        {isPublished ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        {isPublished ? "POST LIVE" : "PUBLISH TO PLATFORM"}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                     <Sparkles className="w-12 h-12 mb-4" />
                     <p className="text-sm font-black uppercase tracking-[0.5em]">Awaiting Ingestion</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card-premium max-w-2xl w-full bg-[#050505] border-primary/20 p-12 relative overflow-hidden">
              <button onClick={() => setShowSuccessModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
                 <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-6 mb-12">
                 <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)]">
                    <Check className="w-10 h-10 text-black" />
                 </div>
                 <div>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">Forge Successful</h4>
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mt-2 animate-pulse">Asset is now live on {activeTab}</p>
                 </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 mb-12">
                 <p className="text-white/80 text-lg italic leading-relaxed mb-8">&quot;{generatedContent?.body.substring(0, 100)}...&quot;</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40" />
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest text-primary">Forge-AI Deployer</p>
                       <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Network: {activeTab}</p>
                    </div>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setShowSuccessModal(false)} className="flex-1 glass py-6 rounded-full text-[10px] font-black uppercase tracking-widest">Dismiss</button>
                 <Link href={`https://${activeTab}.com`} target="_blank" className="flex-1 bg-white text-black py-6 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                    View Live <ExternalLink className="w-4 h-4" />
                 </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 py-10 text-[10px] font-black tracking-[0.6em] transition-all border-b-2 ${active ? "border-primary text-primary bg-primary/5" : "border-transparent text-white/10 hover:text-white"}`}
    >
      {label}
    </button>
  );
}
