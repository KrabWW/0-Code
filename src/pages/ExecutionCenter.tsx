import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Filter, 
  ArrowRight,
  MoreVertical,
  Activity,
  Terminal,
  ExternalLink,
  GitBranch,
  GitMerge,
  Server
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ExecutionRun } from '../types';

const mockRuns: ExecutionRun[] = [
  { 
    id: 'RUN-100234', 
    skillName: 'PLC 数据采集-组A', 
    startTime: '2024-03-21 14:20:11', 
    duration: '120ms', 
    status: 'success', 
    operator: 'System Auto', 
    target: 'Zone-A-PLC',
    worktree: { branch: 'main', repo: 'factory-core', merged: true }
  },
  { 
    id: 'RUN-100235', 
    skillName: '异常检测与报警', 
    startTime: '2024-03-21 14:20:45', 
    duration: 'Running', 
    status: 'running', 
    operator: 'Event Trigger', 
    target: 'Cloud Storage',
    worktree: { branch: 'feat/alert-optimize', repo: 'factory-ai', merged: false }
  },
  { 
    id: 'RUN-100236', 
    skillName: '工序数据回填-V2', 
    startTime: '2024-03-21 14:15:30', 
    duration: '2.4s', 
    status: 'failed', 
    operator: 'User: Admin', 
    target: 'ERP-Production',
    worktree: { branch: 'fix/erp-timeout', repo: 'factory-erp', merged: false }
  },
  { 
    id: 'RUN-100237', 
    skillName: '自动审批流-IT需', 
    startTime: '2024-03-21 13:55:00', 
    duration: '45ms', 
    status: 'success', 
    operator: 'Webhooks', 
    target: 'O/A System',
    worktree: { branch: 'main', repo: 'factory-oa', merged: true }
  },
  { 
    id: 'RUN-100238', 
    skillName: '库存预警同步', 
    startTime: '2024-03-21 13:40:12', 
    duration: '1.2s', 
    status: 'success', 
    operator: 'Cron Job', 
    target: 'WMS-Internal',
    worktree: { branch: 'feat/wms-sync', repo: 'factory-wms', merged: false }
  },
];

export const ExecutionCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">执行中心</h2>
          <p className="text-text-sub text-sm">监控平台所有技能的实时执行动态。每个执行任务均在独立 Worktree 中运行。</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
             清理 Worktree
          </button>
          <button className="btn-primary">
            <Server size={18} /> 在线运行终端
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-bg-card border border-white/5 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-black/20 group hover:border-primary/30 transition-all">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
             <GitBranch size={22} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">活跃 Worktree</div>
            <div className="text-2xl font-black text-white">12</div>
          </div>
        </div>
        <div className="bg-bg-card border border-white/5 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-black/20 group hover:border-success/30 transition-all">
          <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center border border-success/20 group-hover:bg-success/20 transition-all">
             <GitMerge size={22} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">已合并分支</div>
            <div className="text-2xl font-black text-white">842</div>
          </div>
        </div>
        <div className="bg-bg-card border border-white/5 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-black/20 group hover:border-primary/30 transition-all">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
             <AlertCircle size={22} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">执行回滚</div>
            <div className="text-2xl font-black text-white">3</div>
          </div>
        </div>
        <div className="bg-bg-card border border-white/5 p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-black/20 group hover:border-warning/30 transition-all">
          <div className="w-12 h-12 bg-warning/10 text-warning rounded-xl flex items-center justify-center border border-warning/20 group-hover:bg-warning/20 transition-all">
             <Terminal size={22} />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">集群负载</div>
            <div className="text-2xl font-black text-white">24%</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex gap-4">
             <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mute" />
              <input 
                type="text" 
                placeholder="搜索单号、技能、分支..." 
                className="pl-9 pr-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              自动刷新 (5s)
            </span>
            <button className="btn-secondary py-1 text-[10px] font-bold px-3 uppercase tracking-wider">
              历史过滤
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20 border-b border-white/5 text-[10px] text-slate-500 font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-black">执行单号</th>
                <th className="px-6 py-4 font-black">技能单元 / Git Worktree</th>
                <th className="px-6 py-4 font-black">执行状态</th>
                <th className="px-6 py-4 font-black">目标对象</th>
                <th className="px-6 py-4 font-black">开始时间</th>
                <th className="px-6 py-4 font-black">合并操作</th>
                <th className="px-6 py-4 font-black"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {mockRuns.map((run) => (
                <tr key={run.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-xs font-mono font-bold text-white opacity-80">{run.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-200">{run.skillName}</div>
                    {run.worktree && (
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-primary/80 font-mono font-bold">
                        <GitBranch size={10} /> {run.worktree.repo}/{run.worktree.branch}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-black uppercase inline-flex items-center gap-1 border",
                      run.status === 'success' ? "bg-success/5 text-success border-success/20" : 
                      run.status === 'running' ? "bg-primary/5 text-primary border-primary/20 animate-pulse" : 
                      "bg-error/5 text-error border-error/20"
                    )}>
                      {run.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1.5 font-mono">{run.duration}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                    {run.target}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                    {run.startTime}
                  </td>
                  <td className="px-6 py-4">
                    {run.status === 'success' && run.worktree && !run.worktree.merged ? (
                      <button className="flex items-center gap-1 text-primary hover:bg-primary/10 px-2 py-1.5 rounded-lg transition-all text-[10px] font-black uppercase tracking-wider border border-primary/20">
                        <GitMerge size={14} /> 合并分支
                      </button>
                    ) : run.worktree?.merged ? (
                      <div className="flex items-center gap-1 text-success text-[10px] font-black uppercase tracking-wider">
                        <CheckCircle2 size={14} /> 已合并
                      </div>
                    ) : (
                      <span className="text-slate-600 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/execution/${run.id}`} className="p-2 inline-flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                      <Terminal size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
