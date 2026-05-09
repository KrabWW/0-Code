import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Code, 
  Globe, 
  Shield, 
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Skill } from '../types';

const mockSkills: Skill[] = [
  {
    id: 'SK-001',
    name: 'PLC-S7-1200 数据读取',
    description: '通过 Siemens S7 协议读取现场 PLC 的寄存器数据并进行格式化。',
    code: 'skill_plc_read_s7',
    version: 'v1.2.4',
    status: 'active',
    type: 'Industrial Protocol',
    lastUpdated: '2024-03-20 10:30',
    author: 'Chen Wei',
    usageCount: 4521,
    successRate: 99.8
  },
  {
    id: 'SK-002',
    name: 'ERP 工单自动对账',
    description: '自动对比生产执行系统与 ERP 系统之间的工单差异，并生成异常报告。',
    code: 'skill_erp_sync',
    version: 'v2.0.1',
    status: 'active',
    type: 'System Integration',
    lastUpdated: '2024-03-19 15:45',
    author: 'Li Na',
    usageCount: 1280,
    successRate: 98.5
  },
  {
    id: 'SK-003',
    name: '视觉检测质量分类',
    description: '调用边缘端 AI 模型对流水线抓拍图片进行分类，判断产品是否有缺陷。',
    code: 'skill_ai_vision',
    version: 'v0.9.8',
    status: 'draft',
    type: 'AI/ML',
    lastUpdated: '2024-03-21 09:00',
    author: 'Wang Qiang',
    usageCount: 0,
    successRate: 0
  },
  {
    id: 'SK-004',
    name: 'MQTT 异常消息转发',
    description: '监听指定 MQTT Topic，当触发阈值报警时，通过钉钉/企业微信机器人转发。',
    code: 'skill_mqtt_notify',
    version: 'v1.5.0',
    status: 'active',
    type: 'Messaging',
    lastUpdated: '2024-03-18 11:20',
    author: 'Chen Wei',
    usageCount: 890,
    successRate: 100
  }
];

export const SkillsHub = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">技能中心</h2>
          <p className="text-text-sub text-sm">管理、部署及监控所有的交付技能单元。</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> 新建技能单元
        </button>
      </div>

      {/* Filters & Tabs */}
      <div className="flex justify-between items-center bg-bg-card p-4 rounded-lg border border-border-main shadow-sm">
        <div className="flex gap-2">
          {['all', 'active', 'draft', 'deprecated'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                activeTab === tab 
                  ? "bg-primary text-white" 
                  : "text-text-sub hover:bg-white/5"
              )}
            >
              {tab === 'all' ? '全部技能' : tab === 'active' ? '运行中' : tab === 'draft' ? '草稿' : '已停用'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mute" />
              <input 
                type="text" 
                placeholder="搜索技能名称或代码..." 
                className="pl-9 pr-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-md text-sm w-60 focus:outline-none focus:ring-1 focus:ring-primary h-9 text-white"
              />
          </div>
          <button className="btn-secondary h-9">
            <Filter size={16} /> 筛选
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockSkills.map((skill) => (
          <div key={skill.id} className="card group hover:border-primary transition-all overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {skill.type.includes('Protocol') ? <Zap size={24} /> : 
                     skill.type.includes('System') ? <Globe size={24} /> :
                     skill.type.includes('AI') ? <Shield size={24} /> : <Code size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-text-main group-hover:text-primary transition-colors">{skill.name}</h3>
                      <span className="px-2 py-0.5 bg-white/5 text-slate-500 text-[10px] font-bold rounded uppercase border border-white/5">
                        {skill.version}
                      </span>
                    </div>
                    <div className="text-text-mute text-xs font-mono">{skill.code}</div>
                  </div>
                </div>
                <button className="text-text-mute hover:text-text-main p-1 rounded-md hover:bg-bg-base transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <p className="text-sm text-text-sub line-clamp-2 leading-relaxed mb-6 h-10">
                {skill.description}
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-border-main py-4">
                <div>
                  <div className="text-[10px] text-text-mute uppercase font-bold mb-1">使用统计</div>
                  <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                    <Activity size={14} className="text-primary" /> {skill.usageCount.toLocaleString()} 次
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-mute uppercase font-bold mb-1">成功率</div>
                  <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" /> {skill.successRate}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-mute uppercase font-bold mb-1">最后更新</div>
                  <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                    <Clock size={14} className="text-warning" /> {skill.lastUpdated.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-card px-6 py-3 border-t border-border-main flex justify-between items-center group-hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                  {skill.author.charAt(0)}
                </div>
                <span className="text-xs text-text-sub">{skill.author}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  详情 <ExternalLink size={12} />
                </button>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 border-l pl-2 border-border-main">
                  编辑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple wrapper components for Activity because lucide-react is used in Workspace but Activity is also a general term
const Activity = ({ size, className }: any) => <Zap size={size} className={className} />;
