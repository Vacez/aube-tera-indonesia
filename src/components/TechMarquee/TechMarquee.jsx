import React from 'react';
import { 
  Code2, Cpu, Database, Server, Smartphone, Layers, Terminal, Cloud, ShieldCheck, Box, Flame, Zap, GitBranch, Globe 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TechMarquee = () => {
  const { isDark } = useTheme();

  const techItems = [
    { name: "React.js", category: "Frontend", icon: Code2, color: "text-cyan-400" },
    { name: "Next.js 14", category: "Fullstack", icon: Layers, color: isDark ? "text-slate-100" : "text-slate-800" },
    { name: "Flutter", category: "Mobile App", icon: Smartphone, color: "text-sky-400" },
    { name: "Node.js", category: "Backend Runtime", icon: Server, color: "text-emerald-400" },
    { name: "TypeScript", category: "Language", icon: Terminal, color: "text-blue-400" },
    { name: "Python AI", category: "Machine Learning", icon: Cpu, color: "text-amber-400" },
    { name: "Golang", category: "High Perf Microservices", icon: Zap, color: "text-cyan-400" },
    { name: "PostgreSQL", category: "Enterprise DB", icon: Database, color: "text-indigo-400" },
    { name: "Docker", category: "Containerization", icon: Box, color: "text-sky-400" },
    { name: "AWS Cloud", category: "Infrastructure", icon: Cloud, color: "text-orange-400" },
    { name: "Tailwind CSS", category: "Styling", icon: Globe, color: "text-teal-400" },
    { name: "Redis", category: "In-Memory Cache", icon: Flame, color: "text-rose-400" },
    { name: "Cyber Security", category: "AES-256 & SSL", icon: ShieldCheck, color: "text-emerald-400" },
    { name: "Git DevOps", category: "CI/CD Pipeline", icon: GitBranch, color: "text-purple-400" },
  ];

  return (
    <div className={`py-6 overflow-hidden relative backdrop-blur-md transition-colors duration-300 ${
      isDark ? 'bg-slate-950/80 border-y border-sky-500/15' : 'bg-slate-100/90 border-y border-sky-200'
    }`}>
      {/* Side Fade Gradients for smooth infinite loop transition */}
      <div className={`absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r ${
        isDark ? 'from-slate-950 to-transparent' : 'from-slate-100 to-transparent'
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l ${
        isDark ? 'from-slate-950 to-transparent' : 'from-slate-100 to-transparent'
      }`} />

      <div className="animate-marquee flex gap-6 items-center">
        {[...techItems, ...techItems].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-300 shrink-0 shadow-xs ${
                isDark
                  ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40 hover:bg-slate-900'
                  : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/50'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-sky-50'} ${item.color}`}>
                <IconComp className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold tracking-wide ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.name}</span>
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
