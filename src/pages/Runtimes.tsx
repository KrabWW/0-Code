import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Shield, 
  Activity, 
  Settings2, 
  ExternalLink, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  AlertTriangle,
  Code2,
  Box,
  MessageSquare,
  Network,
  RefreshCcw,
  Zap,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RuntimeConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'active' | 'inactive' | 'error' | 'pending';
  capabilities: string[];
  settings: {
    label: string;
    key: string;
    type: 'text' | 'password' | 'number';
    value: string;
  }[];
}

const initialRuntimes: RuntimeConfig[] = [
  {
    id: 'codex-base',
    name: 'CodeX Engine',
    description: '高性能本地推理底座，深度集成 VS Code 协议。',
    icon: Code2,
    status: 'active',
    capabilities: ['全量本地部署', '离线工作模式', '极低延迟响应'],
    settings: [
      { label: 'API Endpoint', key: 'api_url', type: 'text', value: 'http://localhost:11434' },
      { label: '模型实例', key: 'model', type: 'text', value: 'codex-industrial-large' },
      { label: '并发限制', key: 'concurrency', type: 'number', value: '8' },
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code (Remote)',
    description: '通过远程执行环境提供的 Claude 高级开发能力。',
    icon: MessageSquare,
    status: 'inactive',
    capabilities: ['复杂的代码重构', '自动化测试生成', '多层级逻辑推理'],
    settings: [
      { label: 'Anthropic Key', key: 'api_key', type: 'password', value: 'sk-ant-************' },
      { label: '隧道 ID', key: 'tunnel_id', type: 'text', value: 'tun_9921' },
    ]
  },
  {
    id: 'sambox-cloud',
    name: 'Sambox Node (Beta)',
    description: '预留云端开发沙箱接入，支持分布式远程对话开发。',
    icon: Box,
    status: 'pending',
    capabilities: ['云端隔离环境', '一键环境克隆', '团队实时协同'],
    settings: [
      { label: '沙箱凭证', key: 'token', type: 'password', value: '' },
      { label: '区域选择', key: 'region', type: 'text', value: 'ap-east-1' },
    ]
  }
];

export const Runtimes = () => {
  const [runtimes, setRuntimes] = useState(initialRuntimes);
  const [selectedId, setSelectedId] = useState('codex-base');

  const selectedRuntime = runtimes.find(r => r.id === selectedId);

  const stats = [
    { label: '总运行密度', value: '84%', icon: Activity, color: 'text-success' },
    { label: '底座健康度', value: 'Excellent', icon: Shield, color: 'text-primary' },
    { label: '平均响应延时', value: '12ms', icon: Zap, color: 'text-warning' },
    { label: '集群节点数', value: '12/12', icon: Network, color: 'text-text-main' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">运行底座 (Runtimes)</h1>
          <p className="text-text-mute mt-1">配置与管理系统的对话开发引擎，它是实现自动化的核心底座。</p>
        </div>
        <div className="flex gap-2">
           <button className="btn-secondary h-10 px-4 text-xs">
             <RefreshCcw size={16} /> 刷新底座状态
           </button>
           <button className="btn-primary h-10 px-6 text-xs font-bold shadow-lg shadow-primary/20">
             <Settings2 size={16} /> 应用全局配置
           </button>
        </div>
      </div>

      {/* Real-time Metrics Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card p-4 flex items-center gap-4 hover:shadow-md transition-all border-b-2 border-b-transparent hover:border-b-primary/50">
             <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-bg-base", stat.color)}>
               <stat.icon size={24} />
             </div>
             <div>
               <div className="text-[10px] font-bold text-text-mute uppercase tracking-widest leading-none mb-1">{stat.label}</div>
               <div className="text-xl font-black text-text-main leading-none">{stat.value}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Runtime List */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-text-mute flex items-center gap-2 uppercase tracking-tight ml-1">
            <Globe size={14} /> 可用底座列表
          </div>
          {runtimes.map(runtime => (
            <div 
              key={runtime.id}
              onClick={() => setSelectedId(runtime.id)}
              className={cn(
                "p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group",
                selectedId === runtime.id 
                  ? "bg-bg-card border-primary shadow-xl shadow-primary/5 translate-x-2" 
                  : "bg-bg-card/50 border-border-main hover:border-text-mute/30"
              )}
            >
              {selectedId === runtime.id && (
                <div className="absolute top-0 right-0 p-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
              )}
              <div className="flex gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                  selectedId === runtime.id ? "bg-primary text-white scale-110 rotate-3" : "bg-bg-base text-text-mute group-hover:scale-105"
                )}>
                  <runtime.icon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text-main text-lg">{runtime.name}</h3>
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      runtime.status === 'active' ? "bg-primary/10 text-primary" :
                      runtime.status === 'inactive' ? "bg-white/5 text-slate-500" :
                      runtime.status === 'pending' ? "bg-primary/5 text-primary/70" : "bg-primary/5 text-primary/70"
                    )}>
                      {runtime.status}
                    </div>
                  </div>
                  <p className="text-xs text-text-sub line-clamp-2 leading-relaxed">{runtime.description}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1.5">
                {runtime.capabilities.map(cap => (
                  <span key={cap} className="px-2 py-0.5 bg-white/5 text-[9px] text-slate-500 font-bold rounded-md border border-white/5">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Runtime Configuration */}
        <div className="col-span-12 lg:col-span-7">
          {selectedRuntime ? (
            <div className="card bg-bg-card h-full flex flex-col shadow-2xl shadow-black/20 overflow-hidden border-t-4 border-t-primary">
              <div className="p-8 border-b border-border-main flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <selectedRuntime.icon size={32} className="text-primary" />
                    <h2 className="text-2xl font-black text-text-main">{selectedRuntime.name}</h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-success">
                      <Wifi size={14} /> 核心连接已建立
                    </div>
                    <div className="h-4 w-px bg-border-main" />
                    <div className="text-text-mute">
                      最后同步时间: 2024-05-08 14:22:01
                    </div>
                  </div>
                </div>
                <button className="btn-secondary h-9 px-4 text-xs">
                  <ExternalLink size={14} /> 查看官方文档
                </button>
              </div>

              <div className="p-8 flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-black text-text-main mb-4 flex items-center gap-2">
                    <Settings2 size={16} className="text-primary" /> 参数配置面板
                  </h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {selectedRuntime.settings.map(s => (
                      <div key={s.key} className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-mute uppercase tracking-widest px-1">
                          {s.label}
                        </label>
                        <input 
                          type={s.type} 
                          defaultValue={s.value}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:italic text-white"
                          placeholder={s.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-text-main mb-1">安全提示</h5>
                      <p className="text-xs text-text-sub leading-relaxed">
                        API 密钥与凭证将通过加密隧道直接传输至本地 Runtime 实例，平台不对这些敏感信息进行持久化保存，确保开发主权的绝对安全。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-bg-base/30 border-t border-border-main flex justify-between items-center">
                 <div className="flex items-center gap-2 text-xs font-bold text-text-mute">
                   <Activity size={14} className="text-success animate-pulse" />
                   底座处于实时监听状态...
                 </div>
                 <div className="flex gap-3">
                   <button className="btn-secondary h-10 px-6 text-xs transform active:scale-95 transition-all">测试连接</button>
                   <button className="btn-primary h-10 px-8 text-xs font-bold shadow-lg shadow-primary/20 transform active:scale-95 transition-all">保存并启用该底座</button>
                 </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center bg-bg-card/30 gap-4 border-dashed border-2 border-border-main">
               <div className="w-20 h-20 bg-bg-card rounded-3xl shadow-sm flex items-center justify-center text-text-mute/20 border border-border-main">
                 <Terminal size={40} />
               </div>
               <div className="text-center">
                 <h3 className="font-bold text-text-main text-xl mb-1">请选择运行底座</h3>
                 <p className="text-sm text-text-mute max-w-xs">从左侧列表中选择一个运行引擎进行配置，使其能够支持您的远程开发工作流。</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
