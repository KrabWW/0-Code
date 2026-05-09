import React from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  BarChart, 
  Activity,
  Zap,
  ChevronRight,
  TrendingUp,
  Cpu,
  History as HistoryIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { AnalysisReport } from '../types';

const mockReports: AnalysisReport[] = [
  {
    id: 'REP-2024-001',
    executionId: 'EXE-441-21',
    skillName: 'PLC-Prot-Validation',
    generatedAt: '2分钟前',
    summary: '针对生产线 PLC 数据完整性的深度扫描，发现了 3 处非致命格式偏差。',
    status: 'warning',
    metrics: { accuracy: '98.2%', latency: '240ms', score: 88 },
    insights: ['边缘侧缓冲区可能存在溢出风险', '建议更新反序列化补丁']
  },
  {
    id: 'REP-2024-002',
    executionId: 'EXE-441-20',
    skillName: 'UI-Auto-Sweep',
    generatedAt: '1小时前',
    summary: '全链路 UI 测试流程通过，核心交易路径表现稳定。',
    status: 'passed',
    metrics: { accuracy: '100%', latency: '1.2s', score: 95 },
    insights: ['DOM 渲染效率提升 15%', '无辅助功能障碍发现']
  },
  {
    id: 'REP-2024-003',
    executionId: 'EXE-441-19',
    skillName: 'K8s-Log-Analyzer',
    generatedAt: '3小时前',
    summary: '日志分析器检测到 Pod 频繁重启，初步判定为内存泄漏。',
    status: 'failed',
    metrics: { accuracy: 'N/A', latency: '4.5s', score: 42 },
    insights: ['内存使用量持续攀升', '发现 OOM Kill 信号']
  },
];

export const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight">分析报告 (Analysis)</h1>
          <p className="text-text-mute mt-1">关联执行中心的单次运行审计，提供多维度的分析报告与改进建议。</p>
        </div>
        <div className="flex gap-2">
           <button className="btn-secondary h-10 px-4 text-xs font-bold leading-none">
             <HistoryIcon size={16} /> 原始执行中心
           </button>
           <button className="btn-primary h-10 px-6 text-xs font-bold shadow-lg shadow-primary/20">
             <BarChart size={16} /> 生成聚合看板
           </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '累计报告数', value: '1,284', icon: FileText, color: 'text-primary' },
          { label: '平均健康分', value: '92', icon: Activity, color: 'text-success' },
          { label: '高风险识别', value: '12', icon: AlertTriangle, color: 'text-error' },
          { label: '推理总耗时', value: '48.5h', icon: Cpu, color: 'text-warning' },
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex items-center gap-4 hover:shadow-lg transition-all border-b-2 border-transparent hover:border-primary group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 transition-all group-hover:bg-primary/10", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black text-text-mute uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black text-text-main tracking-tighter">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="card shadow-2xl shadow-black/5 overflow-hidden">
        <div className="p-6 border-b border-border-main bg-bg-card flex justify-between items-center">
           <h3 className="text-sm font-black text-text-main flex items-center gap-2">
             <TrendingUp size={16} className="text-primary" /> 执行后审计列表
           </h3>
           <div className="flex gap-2">
             <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
               <input 
                 type="text" 
                 placeholder="搜索执行 ID 或技能名称..." 
                 className="bg-white/5 border border-white/10 text-white rounded-lg pl-9 pr-4 py-1.5 text-xs w-64 focus:ring-2 focus:ring-primary/40 outline-none transition-all"
               />
             </div>
             <button className="btn-secondary h-8 px-3 text-xs"><Filter size={14} /> 筛选</button>
           </div>
        </div>

        <div className="divide-y divide-border-main">
          {mockReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-white/5 transition-all group flex gap-6">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm border",
                  report.status === 'passed' ? "bg-success/5 text-success border-success/20" :
                  report.status === 'warning' ? "bg-warning/5 text-warning border-warning/20" : "bg-error/5 text-error border-error/20"
                )}>
                  {report.status === 'passed' ? <CheckCircle2 size={24} /> : 
                   report.status === 'warning' ? <AlertTriangle size={24} /> : <XCircle size={24} />}
                </div>
                <div className="text-[10px] font-black text-text-mute uppercase tracking-tighter">{report.generatedAt}</div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="text-lg font-black text-text-main group-hover:text-primary transition-colors">{report.skillName}</h4>
                       <span className="px-2 py-0.5 bg-bg-base text-[10px] font-bold text-text-mute rounded font-mono">
                         {report.executionId}
                       </span>
                    </div>
                    <p className="text-xs text-text-sub leading-relaxed max-w-2xl">{report.summary}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary leading-none">{report.metrics.score}</div>
                    <div className="text-[10px] font-bold text-text-mute uppercase tracking-widest mt-1">Overall Score</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                   <div className="flex items-center gap-4">
                     {Object.entries(report.metrics).filter(([k]) => k !== 'score').map(([key, val]) => (
                       <div key={key} className="flex flex-col">
                         <span className="text-[9px] font-black text-text-mute uppercase tracking-widest mb-0.5">{key}</span>
                         <span className="text-xs font-bold text-text-sub">{val}</span>
                       </div>
                     ))}
                   </div>
                   <div className="h-6 w-px bg-border-main" />
                   <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">Insights:</span>
                      <div className="flex gap-2">
                        {report.insights.map((insight, idx) => (
                           <span key={idx} className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/10 whitespace-nowrap">
                             {insight}
                           </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                 <Link 
                   to={`/execution/${report.executionId}`}
                   className="btn-secondary w-10 h-10 p-0 flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                 >
                    <ArrowUpRight size={18} />
                 </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-bg-card border-t border-border-main flex justify-center">
           <button className="text-xs font-bold text-text-mute hover:text-primary flex items-center gap-1 transition-colors">
             加载更多历史报告 <ChevronRight size={14} />
           </button>
        </div>
      </div>
      
      {/* Visual Analytics Preview */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card p-6 min-h-[300px] flex flex-col">
           <h3 className="text-sm font-black text-text-main mb-6 flex items-center gap-2">
              <Zap size={16} className="text-warning" /> 执行健康度趋势面板
           </h3>
           <div className="flex-1 flex items-end justify-between gap-2 px-2">
              {[65, 82, 78, 90, 85, 95, 92, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                   <div className="w-full bg-primary/20 rounded-t-lg relative transition-all group-hover:bg-primary/40" style={{ height: `${h}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                   </div>
                   <span className="text-[10px] text-text-mute font-bold">W{i+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="card p-6 min-h-[300px] flex flex-col justify-center items-center gap-4 bg-primary/10 border-dashed border-primary/20">
           <div className="w-16 h-16 bg-bg-card rounded-full shadow-lg flex items-center justify-center text-primary">
             <BarChart size={32} />
           </div>
           <div className="text-center">
             <h4 className="font-bold text-text-main">多维效能视图</h4>
             <p className="text-xs text-text-mute max-w-[240px] mt-2">
               即将上线更高级的 AI 驱动看板，支持跨项目的技能执行效能对比分析。
             </p>
           </div>
           <button className="btn-secondary px-6 text-[10px] font-bold">查看内测说明</button>
        </div>
      </div>
    </div>
  );
};
