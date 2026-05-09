import React from 'react';
import { 
  Zap, 
  Activity, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Box,
  Server,
  Cloud,
  Github,
  FolderOpen
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const stats = [
  { label: '活跃技能', value: '42', icon: Zap, color: 'text-primary' },
  { label: '今日调用', value: '1,284', icon: Activity, color: 'text-slate-400' },
  { label: '环境状态', value: 'Healthy', icon: Cloud, color: 'text-slate-400' },
  { label: '告警事件', value: '0', icon: Box, color: 'text-slate-400' },
];

const projects = [
  { name: 'Core Factory Backend', repo: 'rj-platform/core', branch: 'main', status: 'deploying' },
  { name: 'Visual AI Engine', repo: 'rj-platform/vision', branch: 'develop', status: 'idle' },
];

export const Workspace = () => {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6 flex flex-col gap-2 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className={cn("w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/10", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-text-mute text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              <span className="text-2xl font-bold text-text-main">{stat.value}</span>
            </div>
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
               <TrendingUp size={64} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FolderOpen className="text-primary" size={20} />
              项目工程
            </h3>
            <button className="text-xs font-bold text-primary hover:underline">管理全部项目</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((prj, i) => (
              <div key={i} className="card p-5 group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">{prj.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Github size={12} className="text-text-mute" />
                      <span className="text-[10px] font-mono text-text-mute">{prj.repo}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    prj.status === 'deploying' ? "bg-primary/10 text-primary animate-pulse" : "bg-slate-800 text-slate-400 border border-white/5"
                  )}>
                    {prj.status}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-bg-card bg-primary text-white text-[8px] flex items-center justify-center font-bold">AD</div>
                      <div className="w-6 h-6 rounded-full border-2 border-bg-card bg-success text-white text-[8px] flex items-center justify-center font-bold">CW</div>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex-1">
                      <div className="h-full bg-primary w-2/3 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                   </div>
                   <span className="text-[10px] font-bold text-text-mute">67%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-border-main flex justify-between items-center bg-bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold text-text-main flex items-center gap-2">
                <Server size={18} className="text-primary" />
                近期执行动态
              </h3>
              <Link to="/execution" className="btn-secondary h-8 px-3 text-xs">执行记录</Link>
            </div>
            <div className="divide-y divide-border-main">
              {[
                { time: '14:20', task: 'PLC 数据采集-组A', status: 'success', info: 'Zone-A-PLC' },
                { time: '14:15', task: '工序数据回填-V2', status: 'error', info: 'ERP-Production' },
                { time: '14:02', task: '自动审批流', status: 'success', info: 'O/A System' },
              ].map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-text-mute group-hover:text-white transition-colors">{item.time}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{item.task}</span>
                      <span className="text-[10px] text-text-mute uppercase tracking-tighter">Target: {item.info}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    item.status === 'success' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                  )}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Links */}
        <div className="space-y-6">
          <div className="card p-6 bg-primary text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">欢迎回来, 管理员</h3>
              <p className="text-white/80 text-xs mb-6 leading-relaxed">
                当前系统运行平稳，共有 12 个生产环境连接器处于在线状态。
              </p>
              <Link to="/editor" className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-bold text-xs hover:bg-white/90 transition-all shadow-lg shadow-black/10">
                开启新技能编排 <ChevronRight size={14} />
              </Link>
            </div>
            <Activity size={120} className="absolute -bottom-10 -right-10 text-white/10" />
          </div>

            <div className="p-6">
              <h3 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
                <Settings size={16} /> 快捷操作
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] hover:border-primary/30 border border-white/[0.05] transition-all group">
                  <Box size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">导入资产</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] hover:border-primary/30 border border-white/[0.05] transition-all group">
                  <Zap size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">快速调试</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] hover:border-primary/30 border border-white/[0.05] transition-all group">
                  <Github size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">仓库同步</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] hover:border-primary/30 border border-white/[0.05] transition-all group">
                  <Server size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">节点监控</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
