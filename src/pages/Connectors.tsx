import React, { useState } from 'react';
import { 
  Database, 
  Unplug, 
  Globe, 
  Settings2, 
  Plus, 
  Search, 
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Link2,
  LayoutGrid,
  List,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { id: 'all', name: '全部' },
  { id: 'mcp', name: 'MCP 协议' },
  { id: 'automation', name: '自动化测试' },
  { id: 'sql', name: '数据库 (SQL/NoSQL)' },
  { id: 'enterprise', name: '企业系统 & 协同' },
];

const installedConnectors = [
  { id: '1', name: 'MCP Postgres Bridge', type: 'MCP / SQL', status: 'connected', category: 'mcp', usage: 124, lastSync: '2分钟前' },
  { id: '2', name: 'Playwright Executor', type: 'Automation', status: 'connected', category: 'automation', usage: 891, lastSync: '1小时前' },
  { id: '3', name: 'Feishu-CLI Sync', type: 'Collaboration', status: 'connected', category: 'enterprise', usage: 45, lastSync: '3小时前' },
  { id: '4', name: 'TestCenter AI MCP', type: 'MCP / Test', status: 'connected', category: 'mcp', usage: 12, lastSync: '10分钟前' },
];

const discoverConnectors = [
  { id: 'd1', name: 'Browser-less Agent', desc: '基于 Playwright 的无头浏览器集群，用于大规模自动化 UI 测试与爬虫。', author: 'Automation stack', rating: 4.8, count: '12k', icon: 'chrome' },
  { id: 'd2', name: 'Lark/Feishu integration', desc: '深度支持飞书多维表格、审批流与消息机器人自动化控制。', author: 'ByteDance', rating: 4.9, count: '8.4k', icon: 'message' },
  { id: 'd3', name: 'PostgreSQL MCP Server', desc: '标准的 Model Context Protocol 实现，让 AI 直接理解和操作数据库 Schema。', author: 'MCP Core', rating: 4.7, count: '15k', icon: 'db' },
  { id: 'd4', name: 'Auto-Test Orchestrator', desc: '专门针对本平台测试中心的 MCP 插件，实现测试用例的 AI 自动生成与执行编排。', author: 'RJ-Platform', rating: 4.6, count: '5.2k', icon: 'shield' },
];

export const Connectors = () => {
  const [activeTab, setActiveTab] = useState('installed');
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">连接器中心</h2>
          <p className="text-slate-500 text-sm mt-1">连接平台与世界。从工业协议到云端服务，实现一切数据的互联互通。</p>
        </div>
        <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 shadow-2xl shadow-black/50">
           <button 
             onClick={() => setActiveTab('installed')}
             className={cn("px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", activeTab === 'installed' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white hover:bg-white/5")}
           >
             已安装
           </button>
           <button 
             onClick={() => setActiveTab('discover')}
             className={cn("px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", activeTab === 'discover' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white hover:bg-white/5")}
           >
             发现更多
           </button>
        </div>
      </div>

      {activeTab === 'installed' ? (
        <div className="space-y-6">
          <div className="bg-bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-xl shadow-black/20 flex items-center justify-between">
            <div className="flex gap-2">
              {categories.map((c) => (
                <button 
                  key={c.id} 
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border",
                    filter === c.id ? "bg-primary/10 border-primary/40 text-primary" : "border-white/5 text-slate-500 hover:bg-white/5"
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="搜索已连设备或系统..." 
                className="pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 group hover:border-primary/50 transition-all bg-bg-card/30 shadow-inner">
               <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4 text-white">
                  <Plus size={28} strokeWidth={2.5} />
               </div>
               <span className="font-black text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors">新建连接</span>
            </button>
            {installedConnectors
              .filter(item => filter === 'all' || item.category === filter)
              .map((item) => (
              <div key={item.id} className="card group hover:border-primary/40 transition-all flex flex-col overflow-hidden">
                 <div className="p-4 border-b border-white/5 bg-black/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", item.status === 'connected' ? "bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-primary shadow-[0_0_8px_rgba(236,28,36,0.5)]")} />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <button className="text-slate-600 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="font-black text-lg text-white mb-2 group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">
                       <TrendingUp size={12} className="text-slate-600" />
                       <span>累计流量: <span className="text-white opacity-60">{item.usage}k calls</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-wide">
                       <Zap size={12} className="text-primary/70" />
                       <span>关联技能: <span className="text-primary font-black">3</span> 个活跃流</span>
                    </div>
                    <div className="mt-auto pt-5 border-t border-white/5 flex justify-between items-center">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">同步: {item.lastSync}</div>
                       <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline px-2 py-1 bg-primary/10 rounded-md">详情</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
           {/* Featured */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-gradient-to-br from-primary to-black/80 p-9 text-white relative overflow-hidden flex flex-col justify-between min-h-[240px] border-none shadow-primary/20">
                 <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-5 border border-white/10">热门推荐</div>
                    <h3 className="text-2xl font-black mb-3 italic tracking-tight">OpenAI GPT-4o Connector</h3>
                    <p className="opacity-70 max-w-md text-sm leading-relaxed font-medium">
                       在您的工业技能流中集成最强大的 AI 模型。支持工艺优化分析、视觉缺陷描述文字化及自动化文档撰写。
                    </p>
                 </div>
                 <div className="relative z-10 flex gap-4 mt-8">
                    <button className="bg-white text-primary px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/30 active:scale-95 transition-all">立即配置</button>
                    <button className="bg-white/5 border border-white/20 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">查看细节</button>
                 </div>
                 <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
              </div>
              <div className="card bg-gradient-to-br from-slate-700 to-black p-9 text-white relative overflow-hidden flex flex-col justify-between min-h-[240px] border-none">
                 <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-5 border border-white/10">最新发布</div>
                    <h3 className="text-2xl font-black mb-3 italic tracking-tight">Global SAP MES Bridge 2.0</h3>
                    <p className="opacity-70 max-w-md text-sm leading-relaxed font-medium">
                       深度适配 SAP S/4HANA 的 MES 模组。支持毫秒级生产报工同步，解决跨系统协同延迟痛点。
                    </p>
                 </div>
                 <div className="relative z-10 flex gap-4 mt-8">
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/30 active:scale-95 transition-all">立即配置</button>
                    <button className="bg-white/5 border border-white/20 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">查看细节</button>
                 </div>
                 <Database className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
              </div>
           </div>

           {/* Marketplace Grid */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">探索热门集成</h3>
                 <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group bg-primary/10 px-3 py-1 rounded-full">
                    全部连接器 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {discoverConnectors.map((c) => (
                    <div key={c.id} className="card p-7 group cursor-pointer hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/5">
                       <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 mb-5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                          <Globe size={28} strokeWidth={1.5} className="text-slate-400 group-hover:text-primary transition-all" />
                       </div>
                       <h4 className="font-black text-white text-lg mb-2 group-hover:text-primary transition-colors">{c.name}</h4>
                       <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-8 font-medium italic">"{c.desc}"</p>
                       <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-warning bg-warning/10 px-2.5 py-1 rounded-lg">
                             <Star size={12} fill="currentColor" /> {c.rating}
                          </div>
                          <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{c.count} 安装</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
