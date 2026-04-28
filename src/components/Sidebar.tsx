"use client";

import { Zap, Sparkles, BarChart3, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on landing page if preferred, but for "Sleek" we'll make it a floating minimal strip
  const menuItems = [
    { name: "Home", icon: <Zap className="w-5 h-5" />, path: "/" },
    { name: "Studio", icon: <Sparkles className="w-5 h-5" />, path: "/studio" },
    { name: "Intelligence", icon: <BarChart3 className="w-5 h-5" />, path: "/intelligence" },
  ];

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 h-auto w-16 glass rounded-full border border-white/10 z-50 flex flex-col items-center py-8 gap-8 transition-all hover:w-20 hover:border-primary/20 shadow-2xl">
      <Link href="/" className="group">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-110 transition-transform">
          <Zap className="w-6 h-6 text-black" />
        </div>
      </Link>

      <nav className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`p-3 rounded-full transition-all relative group ${isActive ? "text-primary bg-primary/10" : "text-white/20 hover:text-white"}`}
            >
              {item.icon}
              <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
        <button className="text-white/20 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
