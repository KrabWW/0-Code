import React from 'react';
import { 
  Home, 
  Package, 
  Zap, 
  FileText, 
  Settings, 
  Database, 
  ShieldCheck, 
  Library, 
  BarChart2,
  Terminal,
  Layers,
  Cpu,
  MessageSquare
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const sidebarItems = [
  { icon: Home, label: '概览', path: '/' },
  { icon: MessageSquare, label: '智能对话', path: '/chat' },
  { icon: Layers, label: '看板中心', path: '/board' },
  { icon: Package, label: '技能中心', path: '/skills' },
  { icon: Terminal, label: '技能编排', path: '/editor' },
  { icon: Cpu, label: '运行底座', path: '/runtimes' },
  { icon: Zap, label: '执行中心', path: '/execution' },
  { icon: Database, label: '连接器中心', path: '/connectors' },
  { icon: ShieldCheck, label: '测试中心', path: '/test' },
  { icon: BarChart2, label: '分析报告', path: '/reports' },
];

export const Sidebar = () => {
  return (
    <aside className="w-20 bg-[#0a0a0a] flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl shadow-black/50">
      <div className="h-20 flex items-center justify-center border-b border-white/5">
        <div className="flex items-center justify-center p-2 bg-white rounded-xl m-3 shadow-lg shadow-black/50 border border-white/10 opacity-90 hover:opacity-100 transition-opacity group">
          <img
            src="/input_file_0.png"
            alt="Ruijie"
            className="w-12 h-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl';
              fallback.textContent = 'RJ';
              e.currentTarget.parentElement?.appendChild(fallback);
            }}
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "sidebar-item",
              isActive && "sidebar-item-active"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <NavLink to="/settings" className={({ isActive }) => cn(
          "sidebar-item",
          isActive && "sidebar-item-active"
        )}>
          <Settings size={22} />
        </NavLink>
      </div>
    </aside>
  );
};
