import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Save, 
  Play, 
  Share2, 
  Trash2, 
  Plus, 
  Settings2,
  ChevronRight,
  Database,
  Unplug,
  Zap,
  MessageSquare,
  Box,
  GitBranch,
  GitCommit,
  ArrowUpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const nodeTypes = [
  { id: 'trigger', label: '触发器', icon: Zap, color: 'text-warning bg-warning/10' },
  { id: 'adapter', label: '协议适配器', icon: Unplug, color: 'text-primary bg-primary/10' },
  { id: 'logic', label: '逻辑处理', icon: Settings2, color: 'text-success bg-success/10' },
  { id: 'database', label: '数据库', icon: Database, color: 'text-slate-400 bg-white/5' },
  { id: 'notification', label: '通知推送', icon: MessageSquare, color: 'text-slate-400 bg-white/5' },
  { id: 'output', label: '终端输出', icon: Box, color: 'text-slate-400 bg-white/5' },
];

export const SkillEditor = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'trigger', x: 100, y: 150, name: '定时任务: 5min' },
    { id: 2, type: 'adapter', x: 350, y: 150, name: 'Modbus TCP 读取' },
    { id: 3, type: 'logic', x: 600, y: 150, name: '阈值检查 (T > 80)' },
    { id: 4, type: 'notification', x: 850, y: 150, name: '钉钉机器人报警' },
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-bg-base border border-border-main rounded-xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Editor Toolbar */}
      <div className="h-14 border-b border-border-main flex items-center justify-between px-4 bg-bg-card z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-main">PLC 数据监控流</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <GitBranch size={10} className="text-primary" />
              <span className="text-[10px] text-primary font-bold uppercase tracking-tight">feat/threshold-logic</span>
            </div>
          </div>
          <div className="h-4 w-px bg-white/5" />
          <div className="flex gap-1">
             <button className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-text-sub hover:bg-white/5 rounded transition-colors border border-white/5 border-dashed">
                <GitCommit size={12} /> Commit (4 changes)
             </button>
             <button className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-white bg-primary hover:bg-primary/90 rounded transition-colors shadow-sm">
                <ArrowUpCircle size={12} /> Push to Origin
             </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-secondary py-1.5 text-xs">
            <Save size={14} /> 保存本地
          </button>
          <button className="btn-primary py-1.5 text-xs">
            <Play size={14} /> 运行并测试
          </button>
          <div className="h-6 w-px bg-border-main mx-2" />
          <button className="p-2 text-text-mute hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Components */}
        <div className="w-64 border-r border-border-main bg-bg-card/50 p-4 overflow-y-auto">
          <div className="text-[10px] text-text-mute uppercase font-bold mb-4 tracking-wider">组件库</div>
          <div className="space-y-3">
            {nodeTypes.map((type) => (
              <div 
                key={type.id}
                className="p-3 bg-white/[0.02] border border-white/5 rounded-xl shadow-sm cursor-grab hover:border-primary group transition-all"
                draggable
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-md", type.color)}>
                    <type.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{type.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="text-[10px] text-text-mute uppercase font-bold mb-4 tracking-wider">已连接的连接器</div>
            <div className="space-y-2">
              {[
                { name: 'Siemens S7-PLC', type: 'iot' },
                { name: 'Production DB', type: 'database' },
                { name: 'DingTalk Bot', type: 'notification' },
              ].map((conn, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-white/[0.01] border border-white/5 rounded-lg hover:border-primary/50 cursor-pointer group transition-all">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]",
                  )} />
                  <span className="text-[11px] font-bold text-slate-400 truncate group-hover:text-white transition-colors">{conn.name}</span>
                </div>
              ))}
              <Link to="/connectors" className="block text-[10px] font-bold text-primary hover:underline mt-2">
                管理连接器中心 →
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-[10px] text-text-mute uppercase font-bold mb-4 tracking-wider">我的技能片段</div>
            <div className="p-3 border border-border-main border-dashed rounded-lg text-center text-text-mute text-xs py-10">
               暂无片段，将逻辑节点框选后可存为片段
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-bg-base relative overflow-hidden group">
          {/* Grid Pattern Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(#1f2329 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Node Render (Mock Visual) */}
          <div className="absolute inset-0 p-8">
            {nodes.map((node) => {
              const typeInfo = nodeTypes.find(t => t.id === node.type);
              return (
                <div 
                  key={node.id}
                  style={{ left: node.x, top: node.y }}
                  className="absolute w-48 bg-bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden shadow-black/50"
                >
                  <div className={cn("p-2 border-b border-white/5 flex items-center justify-between", typeInfo?.color)}>
                    <div className="flex items-center gap-2">
                       {typeInfo && <typeInfo.icon size={14} />}
                       <span className="text-[10px] font-black uppercase tracking-wider">{typeInfo?.label}</span>
                    </div>
                    <Settings2 size={12} className="cursor-pointer hover:opacity-70" />
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold text-white">{node.name}</div>
                    <div className="text-[9px] text-slate-500 mt-1 uppercase font-black">Status: Ready</div>
                  </div>
                  {/* Connection Points */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-primary rounded-full z-10 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-primary rounded-full z-10 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                </div>
              );
            })}

            {/* SVG Connections (Static Mock) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 292 201 L 350 201" stroke="#3b82f6" strokeWidth="2" fill="none" className="opacity-50" />
              <path d="M 542 201 L 600 201" stroke="#3b82f6" strokeWidth="2" fill="none" className="opacity-50" />
              <path d="M 792 201 L 850 201" stroke="#3b82f6" strokeWidth="2" fill="none" className="opacity-50" />
            </svg>
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
             <div className="bg-bg-card border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
               <button className="p-2 hover:bg-white/5 border-b border-white/5 text-slate-400 hover:text-white transition-all">+</button>
               <button className="p-2 hover:bg-white/5 text-[10px] font-bold text-slate-500">100%</button>
               <button className="p-2 hover:bg-white/5 border-t border-white/5 text-slate-400 hover:text-white transition-all">-</button>
             </div>
             <button className="p-3 bg-primary text-white border border-primary shadow-xl shadow-primary/20 rounded-xl hover:bg-primary/90 transition-all active:scale-95">
               <Plus size={18} strokeWidth={3} />
             </button>
          </div>
        </div>

        {/* Right Sidebar: Properties */}
        <div className="w-80 border-l border-border-main bg-bg-card p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-bold text-text-main">节点配置</h3>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">阈值检查</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">节点名称</label>
              <input 
                type="text" 
                defaultValue="阈值检查 (T > 80)"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">条件表达式</label>
              <div className="font-mono text-xs bg-black/40 p-4 rounded-xl border border-white/5 border-l-4 border-l-primary text-primary/90 shadow-inner">
                payload.temperature &gt; config.threshold
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">阈值设定</label>
              <div className="flex gap-2">
                 <input 
                  type="number" 
                  defaultValue="80"
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <select className="bg-white/[0.03] border border-white/10 rounded-xl px-3 text-[10px] font-black text-white hover:bg-white/5 transition-colors">
                  <option className="bg-bg-card">℃</option>
                  <option className="bg-bg-card">℉</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <ChevronRight size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary">高级设置</span>
              </div>
              <div className="text-[10px] text-slate-500 italic">
                开启重试、延迟执行及缓存策略。
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5">
            <button className="w-full btn-primary justify-center h-11 text-xs tracking-wider">应用配置</button>
            <button className="w-full btn-secondary mt-3 justify-center h-11 text-xs tracking-wider">重置</button>
          </div>
        </div>
      </div>
    </div>
  );
};
