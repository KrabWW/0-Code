import React, { useState } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  Filter, 
  GitBranch, 
  Clock, 
  ChevronRight,
  Zap,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  Github,
  ExternalLink,
  ChevronDown,
  Cpu,
  GitPullRequest,
  Activity,
  History as HistoryIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Project } from '../types';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  creator: string;
  assignee: string;
  skillId?: string;
  branch?: string;
  comments: number;
  attachments: number;
}

const mockProjects: Project[] = [
  { 
    id: 'p1', 
    name: 'Industrial Core SDK', 
    description: '核心工业协议处理底座',
    repoUrl: 'https://github.com/RJ-Industrial/core-engine',
    branch: 'main',
    createdAt: '2024-01-01',
    environments: []
  },
  { 
    id: 'p2', 
    name: 'Smart Warehouse UI', 
    description: '自动化仓储管理系统前端',
    repoUrl: 'https://github.com/RJ-Industrial/ui-components',
    branch: 'develop',
    createdAt: '2024-02-15',
    environments: []
  },
  { 
    id: 'p3', 
    name: 'Edge Controller v4', 
    description: '次世代边缘控制节点固件',
    repoUrl: 'https://github.com/RJ-Industrial/edge-node',
    branch: 'main',
    createdAt: '2024-03-10',
    environments: []
  },
];

const initialTasks: Task[] = [
  { 
    id: 'RJ-101', 
    title: '重构 PLC 通讯协议栈，支持 S7-1500 变体', 
    status: 'in-progress', 
    priority: 'urgent', 
    creator: 'Admin', 
    assignee: 'AD', 
    skillId: 'SK-001', 
    branch: 'feature/s7-1500-support',
    comments: 12,
    attachments: 2
  },
  { 
    id: 'RJ-105', 
    title: '集成钉钉消息机器人 v3 版本 API', 
    status: 'todo', 
    priority: 'high', 
    creator: 'Chen Wei', 
    assignee: 'CW', 
    skillId: 'SK-004',
    comments: 3,
    attachments: 0
  },
  { 
    id: 'RJ-102', 
    title: '视觉处理算法增加对破损二维码的识别纠错', 
    status: 'review', 
    priority: 'medium', 
    creator: 'Li Na', 
    assignee: 'LN', 
    skillId: 'SK-003',
    branch: 'fix/vision-qr-robustness',
    comments: 5,
    attachments: 4
  },
  { 
    id: 'RJ-108', 
    title: '清理旧版 ERP 适配器中的冗余环境变量', 
    status: 'done', 
    priority: 'low', 
    creator: 'Wang Qiang', 
    assignee: 'WQ',
    comments: 2,
    attachments: 1
  }
];

const priorityColors = {
  low: 'text-slate-500 bg-white/[0.02] border border-white/5',
  medium: 'text-slate-300 bg-white/[0.05] border border-white/10',
  high: 'text-primary/80 bg-primary/5 border border-primary/20',
  urgent: 'text-primary bg-primary/20 border border-primary/40'
};

export const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeProject, setActiveProject] = useState(mockProjects[0]);

  const columns = [
    { id: 'todo', label: '待处理', count: tasks.filter(t => t.status === 'todo').length },
    { id: 'in-progress', label: '开发中', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'review', label: '执行审计', count: tasks.filter(t => t.status === 'review').length },
    { id: 'done', label: '已完成/已合并', count: tasks.filter(t => t.status === 'done').length },
  ];

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      {/* Top Scoped Controller */}
      <div className="flex justify-between items-center bg-bg-card p-3 rounded-2xl border border-border-main shadow-lg shadow-black/20">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-bg-base/50 rounded-xl transition-all group border border-transparent hover:border-border-main/50">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
              <Cpu size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-text-mute uppercase tracking-widest leading-none mb-1 opacity-60">Scoped Project</span>
              <div className="flex items-center gap-1">
                <select 
                  className="font-black text-[15px] bg-transparent outline-none cursor-pointer text-text-main pr-1 appearance-none"
                  value={activeProject.id}
                  onChange={(e) => setActiveProject(mockProjects.find(p => p.id === e.target.value)!)}
                >
                  {mockProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <ChevronDown size={14} className="text-text-mute" />
              </div>
            </div>
          </div>
          
          <div className="h-10 w-px bg-border-main mx-4" />

          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-text-mute uppercase tracking-widest mb-1">GitHub Repo</span>
                <div className="flex items-center gap-2">
                   <Github size={14} className="text-text-main" />
                   <span className="text-xs font-bold text-text-main font-mono">{activeProject.repoUrl.replace('https://github.com/', '')}</span>
                   <ExternalLink size={12} className="text-text-mute hover:text-primary cursor-pointer" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-text-mute uppercase tracking-widest mb-1">Active Pipeline</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                   <span className="text-xs font-bold text-success capitalize">Production Build Running</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex gap-2 pr-2">
           <button className="btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-2">
             <HistoryIcon size={16} /> 运行历史
           </button>
           <button className="btn-primary h-10 px-6 text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
             <Plus size={18} strokeWidth={3} /> 新建项目
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map((col) => (
          <div key={col.id} className="w-[320px] flex flex-col gap-3 min-w-[320px]">
            <div className="flex items-center justify-between px-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-text-main uppercase tracking-widest leading-none">{col.label}</span>
                <span className="w-5 h-5 flex items-center justify-center bg-white/5 border border-white/10 text-[10px] font-black text-text-mute rounded-full shadow-sm">
                  {col.count}
                </span>
              </div>
              <button className="text-text-mute hover:text-text-main transition-colors"><MoreHorizontal size={18} /></button>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <div key={task.id} className="bg-bg-card border border-border-main rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 hover:translate-y-[-2px] transition-all cursor-pointer group p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-text-mute/50 uppercase tracking-tighter">{task.id}</span>
                      <span className={cn("text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest", priorityColors[task.priority])}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black shadow-sm border border-primary/20">
                       {task.assignee}
                    </div>
                  </div>

                  <h3 className="text-[15px] font-black text-text-main leading-tight group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>

                  {task.skillId && (
                    <div className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                      <Zap size={14} className="text-primary" fill="currentColor" />
                      <span className="text-[11px] font-bold text-text-sub">Linked Skill: {task.skillId}</span>
                      {task.status === 'in-progress' && (
                        <div className="ml-auto flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                          <span className="text-[9px] text-success font-black uppercase tracking-widest">Executing</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-border-main/50">
                    <div className="flex items-center gap-3 text-[10px] text-text-mute font-black uppercase tracking-tighter">
                      {task.branch && (
                        <div className="flex items-center gap-1 text-primary">
                          <GitBranch size={13} />
                          <span className="max-w-[80px] truncate">{task.branch}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 hover:text-text-main transition-colors">
                        <MessageSquare size={13} /> {task.comments}
                      </div>
                      <div className="flex items-center gap-1 hover:text-text-main transition-colors">
                        <Paperclip size={13} /> {task.attachments}
                      </div>
                    </div>
                    <div className="text-[10px] text-text-mute/60 font-black uppercase tracking-tighter">
                       5m ago
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center gap-2 p-4 text-text-mute hover:text-primary hover:bg-bg-card rounded-2xl transition-all text-xs font-black uppercase tracking-widest border border-dashed border-border-main/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group">
                <Plus size={16} className="group-hover:rotate-90 transition-transform" /> <span className="opacity-60 group-hover:opacity-100">新建任务项</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
