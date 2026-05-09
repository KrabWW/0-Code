import React from 'react';
import { Bell, Search, User, ChevronDown, HelpCircle, Grid } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pathNames: Record<string, string> = {
  '/': '工作台',
  '/board': '研发看板',
  '/skills': '技能中心',
  '/editor': '技能编排',
  '/execution': '执行中心',
  '/audit': '审计审计',
  '/templates': '模板库',
  '/connectors': '连接器中心',
  '/test': '测试中心',
  '/reports': '分析报告中心',
};

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = pathNames[currentPath] || '工作台';

  return (
    <header className="h-16 bg-[#0a0c10] border-b border-white/[0.05] flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm shadow-black/20">
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Ruijie"
          className="h-8 w-auto object-contain"
        />
        <h1 className="text-sm font-black text-white pr-4 border-r border-white/5 uppercase tracking-[0.2em]">
          RUIJIE <span className="text-primary font-light">0-CODE</span>
        </h1>
        <div className="text-xs font-black text-slate-500 uppercase tracking-widest">
          {pageTitle}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="搜索技能、模板或执行单..." 
            className="pl-10 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 text-white transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98]"
          />
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-white transition-all h-10 w-10 flex items-center justify-center hover:bg-white/10 rounded-xl active:scale-90 group relative">
            <Bell size={20} className="group-hover:animate-pulse" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#0a0c10]" />
          </button>
          <button className="hover:text-white transition-all h-10 w-10 flex items-center justify-center hover:bg-white/10 rounded-xl active:scale-90">
            <HelpCircle size={20} />
          </button>
          <button className="hover:text-white transition-all h-10 w-10 flex items-center justify-center hover:bg-white/10 rounded-xl active:scale-90">
            <Grid size={20} />
          </button>
          
          <div className="flex items-center gap-2 pl-4 border-l border-white/10 cursor-pointer group hover:bg-white/5 p-1 rounded-xl transition-all active:scale-[0.97]">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-white leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">Admin User</span>
              <span className="text-[9px] text-slate-500 uppercase leading-tight font-black tracking-widest">Master Admin</span>
            </div>
            <ChevronDown size={14} className="text-slate-600 group-hover:translate-y-0.5 transition-all" />
          </div>
        </div>
      </div>
    </header>
  );
};
