import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Github, 
  Globe, 
  Cpu, 
  Shield, 
  Key, 
  CreditCard, 
  Save, 
  RefreshCcw,
  AlertTriangle,
  ChevronRight,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-text-main tracking-tight uppercase">系统设置 (Settings)</h1>
        <p className="text-text-mute mt-1">管理您的个人偏好、全局 API 密钥以及 GitHub 研发实验室的集成配置。</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Navigation */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {[
            { label: '个人资料', icon: User, active: true },
            { label: '安全与账号', icon: Lock, active: false },
            { label: '通知路由', icon: Bell, active: false },
            { label: 'Git 集成', icon: Github, active: false },
            { label: '连接器凭证', icon: Key, active: false },
            { label: '订阅与额度', icon: CreditCard, active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all",
                item.active 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-text-sub hover:bg-bg-base/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              {item.active && <ChevronRight size={14} />}
            </button>
          ))}
          
          <div className="pt-6">
            <div className="p-4 bg-bg-base/30 rounded-2xl border border-border-main">
              <div className="text-[10px] font-black text-text-mute uppercase tracking-widest mb-2">系统统计</div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-text-sub">API 使用量</span>
                  <span className="text-xs font-black text-text-main">84%</span>
                </div>
                <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Profile Section */}
          <section className="card bg-white p-8 space-y-8 shadow-2xl shadow-black/5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-text-main flex items-center gap-2">
                   <User size={20} className="text-primary" /> 个人资料 (Profile)
                </h3>
                <p className="text-xs text-text-mute mt-1">设置您的全局身份信息，这会影响到处执行日志中的 Operator 标识。</p>
              </div>
              <button className="btn-secondary h-9 px-4 text-xs font-bold leading-none">
                <RefreshCcw size={14} /> 恢复默认
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-text-mute uppercase tracking-widest px-1">显示名称</label>
                <input 
                  type="text" 
                  defaultValue="Senior Operator 01"
                  className="w-full bg-bg-base border border-border-main rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-text-mute uppercase tracking-widest px-1">工作邮箱</label>
                <input 
                  type="email" 
                  defaultValue="operator@rj-industrial.com"
                  className="w-full bg-bg-base border border-border-main rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-text-mute uppercase tracking-widest px-1">个人简介</label>
                <textarea 
                  rows={3}
                  defaultValue="负责 PLC 自动化流水线诊断与 AI 技能编排，专注于边缘侧推理优化。"
                  className="w-full bg-bg-base border border-border-main rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="h-px bg-border-main" />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-text-main flex items-center gap-2">
                   <Shield size={20} className="text-success" /> Git 集成 (Git Integration)
                </h3>
                <p className="text-xs text-text-mute mt-1">配置全局 GitHub Token，以便平台能够代表您管理项目仓库。</p>
              </div>

              <div className="p-6 bg-success/5 rounded-2xl border border-success/10 border-dashed space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-text-main">
                       <Github size={24} />
                    </div>
                    <div className="flex-1">
                       <div className="text-sm font-black text-text-main">已连接到 GitHub 账号</div>
                       <div className="text-xs text-text-sub">rj-automation-stack (rj-admin)</div>
                    </div>
                    <button className="btn-secondary h-9 px-4 text-[10px] font-bold text-error hover:bg-error/10 hover:border-error/20">
                       断开连接
                    </button>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/50 rounded-xl border border-border-main">
                       <div className="text-[10px] font-black text-text-mute uppercase tracking-widest leading-none mb-2">默认推送分支</div>
                       <div className="flex items-center gap-2">
                          <code className="text-xs bg-bg-base px-2 py-1 rounded font-mono font-bold">main</code>
                          <button className="text-[10px] font-black text-primary uppercase ml-auto">更改</button>
                       </div>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border-main">
                       <div className="text-[10px] font-black text-text-mute uppercase tracking-widest leading-none mb-2">仓库同步频率</div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-main">每 10 分钟</span>
                          <button className="text-[10px] font-black text-primary uppercase ml-auto">更改</button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="h-px bg-border-main" />

            <div className="flex justify-between items-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                     <AlertTriangle size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-text-main">未保存的更改将会丢失</div>
                    <div className="text-xs text-text-sub">您的上次更新时间是 2024-05-08 16:30:11</div>
                  </div>
               </div>
               <button className="flex items-center gap-2 bg-primary text-white h-12 px-8 rounded-xl font-black text-xs shadow-xl shadow-primary/25 hover:translate-y-[-2px] active:translate-y-0 transition-all">
                  <Save size={18} strokeWidth={3} /> 保存所有设置
               </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
