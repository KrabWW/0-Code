import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  ChevronRight, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Plus,
  FolderOpen,
  FileCode,
  Layers,
  Settings,
  Search,
  MoreVertical,
  Activity,
  ArrowRight,
  Filter,
  ChevronDown,
  Edit3,
  GripVertical,
  Move,
  Github,
  Globe,
  Variable,
  X,
  ExternalLink,
  Cpu,
  CloudCog,
  Command,
  Package,
  Zap,
  History as HistoryIcon,
  Download,
  ScrollText,
  Boxes,
  MonitorSmartphone,
  MousePointer2,
  Eye,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Project, ApiInterface, TestCase, Environment, TestScenario } from '../types';

const mockProjects: Project[] = [
  { 
    id: 'PRJ-001', 
    name: 'RJ-Core-Factory', 
    description: '核心工业协议处理后端', 
    repoUrl: 'https://github.com/rj-platform/core', 
    branch: 'main', 
    createdAt: '2024-01-10',
    environments: [
      { id: 'env-1', name: '开发环境 (Dev)', variables: { 'BASE_URL': 'http://dev-api.rj.com', 'PORT': '8080' } },
      { id: 'env-2', name: '测试环境 (Staging)', variables: { 'BASE_URL': 'http://test-api.rj.com', 'PORT': '9090' } },
      { id: 'env-3', name: '生产环境 (Prod)', variables: { 'BASE_URL': 'http://api.rj.com', 'PORT': '443' } },
    ]
  },
  { 
    id: 'PRJ-002', 
    name: 'RJ-Eye-AI', 
    description: '视觉 AI 分拣系统', 
    repoUrl: 'https://github.com/rj-platform/vision', 
    branch: 'develop', 
    createdAt: '2024-02-15',
    environments: [
      { id: 'env-4', name: 'AI-Dev', variables: { 'GPU_NODE': 'nv-01' } }
    ]
  },
];

const folders = [
  { id: 'f1', name: '用户管理模块', parentId: null },
  { id: 'f2', name: '订单处理流程', parentId: null },
  { id: 'f3', name: 'PLC 数据桥接', parentId: null },
  { id: 'f4', name: '子目录：权限验证', parentId: 'f1' },
];

const mockApis: ApiInterface[] = [
  { id: 'API-001', projectId: 'PRJ-001', name: 'PLC 数据上报', method: 'POST', path: '/api/v1/plc/data', description: '接收边缘端上报的 PLC 原始数据' },
  { id: 'API-002', projectId: 'PRJ-001', name: '获取设备状态', method: 'GET', path: '/api/v1/devices/{id}/status', description: '查询指定设备的实时在线状态' },
  { id: 'API-003', projectId: 'PRJ-001', name: '用户登录', method: 'POST', path: '/api/auth/login', description: '统一鉴权接口' },
];

const mockTestCases: Record<string, TestCase[]> = {
  'API-001': [
    { id: 'TC-001', apiId: 'API-001', name: '正常上报测试 - 颗粒度 1s', status: 'passed', priority: 'P0', lastRun: '1小时前' },
    { id: 'TC-002', apiId: 'API-001', name: '异常数据测试 - 字段溢出', status: 'failed', priority: 'P1', lastRun: '2小时前' },
    { id: 'TC-003', apiId: 'API-001', name: '边界值测试 - 空数据包', status: 'idle', priority: 'P2', lastRun: '未执行' },
  ],
  'API-002': [
    { id: 'TC-004', apiId: 'API-002', name: '获取在线设备', status: 'passed', priority: 'P0', lastRun: '30分钟前' }
  ]
};

interface TestScenarioUI extends TestScenario {
  status: 'passed' | 'failed' | 'running' | 'idle';
  lastRun: string;
  reportId?: string;
}

const mockScenarios: TestScenarioUI[] = [
  { 
    id: 'SC-001', 
    projectId: 'PRJ-001', 
    name: '设备上线完整流程测试', 
    status: 'passed', 
    lastRun: '10分钟前',
    reportId: 'REP-SC-001',
    steps: [
      { type: 'api', targetId: 'API-003', name: '用户登录' },
      { type: 'delay', config: { ms: 500 } },
      { type: 'api', targetId: 'API-001', name: '上报数据' }
    ]
  },
  { 
    id: 'SC-002', 
    projectId: 'PRJ-001', 
    name: '异常断电恢复场景', 
    status: 'failed', 
    lastRun: '5小时前',
    reportId: 'REP-SC-002',
    steps: [
      { type: 'api', targetId: 'API-001', name: '上报数据' },
      { type: 'script', config: { cmd: 'reset_power' } },
      { type: 'api', targetId: 'API-002', name: '检查状态' }
    ]
  }
];

interface UiTestUI {
  id: string;
  name: string;
  device: 'desktop' | 'mobile' | 'tablet';
  status: 'passed' | 'failed' | 'idle';
  lastRun: string;
  steps: { action: string; target: string; value?: string }[];
}

const mockUiTests: UiTestUI[] = [
  {
    id: 'UI-001',
    name: '首页控制台自适应测试',
    device: 'desktop',
    status: 'passed',
    lastRun: '2小时前',
    steps: [
      { action: 'Navigate', target: 'https://rj-factory.com' },
      { action: 'Click', target: '#login-btn' },
      { action: 'Input', target: '#username', value: 'admin' },
      { action: 'Extract', target: '.dashboard-title' }
    ]
  },
  {
    id: 'UI-002',
    name: '移动端快捷操作栏验证',
    device: 'mobile',
    status: 'failed',
    lastRun: '1天前',
    steps: [
      { action: 'Viewport', target: 'iPhone 13 Pro' },
      { action: 'Swipe', target: 'bottom-to-top' },
      { action: 'Click', target: '.quick-action-fab' }
    ]
  }
];

interface UiTestReport {
  id: string;
  uiTestId: string;
  timestamp: string;
  status: 'passed' | 'failed';
  duration: string;
  screenshot?: string;
  summary: string;
}

const mockUiReports: UiTestReport[] = [
  {
    id: 'RUI-001',
    uiTestId: 'UI-001',
    timestamp: '2024-05-08 14:20:11',
    status: 'passed',
    duration: '15.4s',
    summary: '验证控制台导航至登录页，输入 admin 后成功重定向。',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bbbda536ad3a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'RUI-002',
    uiTestId: 'UI-001',
    timestamp: '2024-05-07 11:05:45',
    status: 'passed',
    duration: '14.8s',
    summary: '样式回归测试：验证主按钮在 1920x1080 分辨率下的对齐情况。'
  },
  {
    id: 'RUI-003',
    uiTestId: 'UI-002',
    timestamp: '2024-05-09 09:12:33',
    status: 'failed',
    duration: '8.2s',
    summary: '元素定位超时：未找到 .quick-action-fab 选择器。',
    screenshot: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400'
  }
];

export const TestCenter = () => {
  const [activeProject, setActiveProject] = useState(mockProjects[0]);
  const [activeEnv, setActiveEnv] = useState<Environment>(activeProject.environments[0]);
  const [selectedApi, setSelectedApi] = useState<string | null>('API-001');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedUiTest, setSelectedUiTest] = useState<string | null>(null);
  const [showUiReports, setShowUiReports] = useState(false);
  const [testType, setTestType] = useState<'api' | 'scenario' | 'ui'>('api');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['f1', 'f3']);
  const [showEnvManager, setShowEnvManager] = useState(false);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleProjectChange = (projectId: string) => {
    const prj = mockProjects.find(p => p.id === projectId) || mockProjects[0];
    setActiveProject(prj);
    setActiveEnv(prj.environments[0]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-4">
      {/* Top Project & Environment Control Bar (Modern Postman Style) */}
      <div className="flex justify-between items-center bg-bg-card p-3 rounded-2xl border border-border-main shadow-lg shadow-black/20">
        <div className="flex items-center gap-1">
          {/* Project Selector Segment */}
          <div className="flex items-center gap-4 px-4 py-2 hover:bg-white/[0.03] rounded-xl transition-all group border border-transparent hover:border-white/5">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
              <Package size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 opacity-60">Source Project</span>
              <div className="flex items-center gap-1">
                <select 
                  className="font-black text-[15px] bg-transparent outline-none cursor-pointer text-white pr-1 appearance-none"
                  value={activeProject.id}
                  onChange={(e) => handleProjectChange(e.target.value)}
                >
                  {mockProjects.map(p => <option key={p.id} value={p.id} className="bg-bg-card">{p.name}</option>)}
                </select>
                <ChevronDown size={14} className="text-slate-500 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
          
          <div className="h-10 w-px bg-white/5 mx-2" />

          {/* Environment Switcher Segment */}
          <div className="flex items-center gap-4 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl group hover:bg-white/[0.05] transition-all">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest leading-none mb-1">Target Engine</span>
              <div className="flex items-center gap-2">
                <select 
                  className="font-black text-[15px] bg-transparent outline-none cursor-pointer text-white pr-1 appearance-none"
                  value={activeEnv.id}
                  onChange={(e) => setActiveEnv(activeProject.environments.find(env => env.id === e.target.value)!)}
                >
                  {activeProject.environments.map(env => <option key={env.id} value={env.id} className="bg-bg-card">{env.name}</option>)}
                </select>
                <button 
                  onClick={() => setShowEnvManager(true)}
                  className="p-1 hover:bg-primary/20 rounded-md text-primary transition-all active:scale-95"
                >
                  <Variable size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pr-2">
           <Link to="/execution" className="flex items-center gap-2 px-4 py-2 text-xs font-black text-text-sub hover:text-primary hover:bg-primary-light transition-all rounded-lg">
             <HistoryIcon size={14} /> 运行历史
           </Link>
           <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black rounded-lg shadow-lg shadow-primary/25 hover:translate-y-[-1px] active:translate-y-[1px] transition-all">
             <Plus size={18} strokeWidth={3} /> 新建项目
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Navigation Tree Sidebar */}
        <div className="w-72 bg-bg-card border border-border-main rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-2 border-b border-border-main flex bg-white/[0.01]">
            <button 
              onClick={() => setTestType('api')}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all",
                testType === 'api' ? "bg-primary/10 text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Layers size={18} />
              <span className="text-[10px] font-black uppercase tracking-wider">接口中心</span>
            </button>
            <button 
              onClick={() => setTestType('scenario')}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all",
                testType === 'scenario' ? "bg-primary/10 text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Boxes size={18} />
              <span className="text-[10px] font-black uppercase tracking-wider">场景测试</span>
            </button>
            <button 
              onClick={() => setTestType('ui')}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all",
                testType === 'ui' ? "bg-primary/10 text-primary" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <MonitorSmartphone size={18} />
              <span className="text-[10px] font-black uppercase tracking-wider">UI测试</span>
            </button>
          </div>

          <div className="p-4 border-b border-border-main flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              {testType === 'api' ? <Layers size={14} className="text-primary" /> : testType === 'scenario' ? <Boxes size={14} className="text-primary" /> : <MonitorSmartphone size={14} className="text-primary" />} 
              {testType === 'api' ? '资源组织树' : testType === 'scenario' ? '场景用例库' : 'UI自动化套件'}
            </h3>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-500 hover:text-primary transition-colors"><Plus size={14} /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {testType === 'api' ? (
              folders.filter(f => !f.parentId).map(folder => (
                <div key={folder.id} className="space-y-1">
                  <div 
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-lg group transition-all cursor-pointer",
                      expandedFolders.includes(folder.id) ? "bg-white/[0.05] text-white" : "hover:bg-white/[0.03] text-slate-400 hover:text-slate-200"
                    )}
                    onClick={() => toggleFolder(folder.id)}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {expandedFolders.includes(folder.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <FolderOpen size={16} className="text-warning" />
                      <span className="text-xs font-bold truncate">{folder.name}</span>
                    </div>
                  </div>

                  {expandedFolders.includes(folder.id) && (
                    <div className="ml-4 pl-1 border-l border-white/5 space-y-1 pt-1">
                      {folders.filter(f => f.parentId === folder.id).map(sub => (
                         <div key={sub.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] text-xs font-medium text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                            <FolderOpen size={14} className="text-warning opacity-70" />
                            <span>{sub.name}</span>
                         </div>
                      ))}
                      
                      {mockApis.filter((api, i) => folder.id === 'f3' ? i < 2 : folder.id === 'f1' ? i === 2 : false).map((api) => (
                        <div 
                          key={api.id}
                          onClick={() => { setSelectedApi(api.id); setTestType('api'); }}
                          className={cn(
                            "flex items-center justify-between p-2 rounded-md text-[11px] group transition-all cursor-pointer",
                            selectedApi === api.id ? "bg-primary text-white shadow-sm" : "hover:bg-bg-base text-text-sub"
                          )}
                        >
                           <div className="flex items-center gap-2 overflow-hidden">
                              <span className={cn(
                                "text-[8px] font-bold px-1 rounded-sm",
                                api.method === 'GET' ? "bg-blue-500/20 text-blue-500" : "bg-success/20 text-success",
                                selectedApi === api.id && "bg-white/20 text-white"
                              )}>{api.method}</span>
                              <span className="truncate">{api.name}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : testType === 'scenario' ? (
                <div className="space-y-1">
                   {mockScenarios.map(sc => (
                     <div 
                        key={sc.id}
                        onClick={() => setSelectedScenario(sc.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group",
                          selectedScenario === sc.id ? "bg-primary/10 border border-primary/20 text-primary shadow-lg shadow-primary/5" : "text-slate-400 hover:bg-white/[0.03] border border-transparent"
                        )}
                     >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center border",
                          selectedScenario === sc.id ? "bg-primary text-white border-primary/20" : "bg-white/5 border-white/5"
                        )}>
                          <Zap size={14} fill={sc.status === 'passed' ? "currentColor" : "none"} className={sc.status === 'passed' ? "text-success" : sc.status === 'failed' ? "text-error" : "text-slate-500"} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate">{sc.name}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{sc.steps.length} 个原子步骤</span>
                        </div>
                     </div>
                   ))}
                </div>
            ) : (
                <div className="space-y-1">
                   {mockUiTests.map(test => (
                     <div 
                        key={test.id}
                        onClick={() => setSelectedUiTest(test.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group",
                          selectedUiTest === test.id ? "bg-primary/10 border border-primary/20 text-primary shadow-lg shadow-primary/5" : "text-slate-400 hover:bg-white/[0.03] border border-transparent"
                        )}
                     >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center border",
                          selectedUiTest === test.id ? "bg-primary text-white border-primary/20" : "bg-white/5 border-white/5"
                        )}>
                          {test.device === 'mobile' ? <Smartphone size={14} /> : <MonitorSmartphone size={14} />}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate">{test.name}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{test.device.toUpperCase()} MODE</span>
                        </div>
                     </div>
                   ))}
                </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-bg-card border border-border-main rounded-xl overflow-hidden shadow-sm">
          {testType === 'api' ? (
            selectedApi ? (
              <>
                <div className="p-6 border-b border-border-main bg-bg-card/50 relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold rounded uppercase border border-success/20">
                          {mockApis.find(a => a.id === selectedApi)?.method}
                          </span>
                          <h2 className="text-xl font-bold text-text-main">{mockApis.find(a => a.id === selectedApi)?.name}</h2>
                      </div>
                      <div className="text-xs font-mono text-text-sub flex items-center gap-2">
                          <span className="text-success">{activeEnv.variables['BASE_URL'] || '{{BASE_URL}}'}</span>
                          <span className="text-text-mute">{mockApis.find(a => a.id === selectedApi)?.path}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary h-8 px-3 text-xs"><Edit3 size={14} /> 编辑接口</button>
                      <button className="btn-primary h-8 px-3 text-xs shadow-md shadow-primary/20"><Play size={14} /> 调试</button>
                    </div>
                  </div>
                  <Terminal size={120} className="absolute -bottom-10 -right-10 text-text-mute/5 translate-x-1/4" />
                </div>

                {/* Cases List */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-base/30">
                    <div className="text-xs font-bold text-text-mute flex items-center gap-2 uppercase tracking-tight">
                      <Activity size={14} /> Test Cases ({mockTestCases[selectedApi]?.length || 0})
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary h-7 py-0 px-3 text-[10px]"><Move size={12} /> 移动</button>
                      <button className="btn-primary h-7 py-0 px-3 text-[10px] font-bold"><Plus size={12} /> 新增用例</button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] text-text-mute font-bold uppercase tracking-widest border-b border-border-main bg-bg-card sticky top-0 z-10">
                        <tr>
                          <th className="w-10 pl-6 py-3 text-center">#</th>
                          <th className="px-6 py-3">用例名称</th>
                          <th className="px-6 py-3">优先级</th>
                          <th className="px-6 py-3">状态</th>
                          <th className="px-6 py-3">最近运行</th>
                          <th className="px-6 py-3 text-right pr-6">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-main">
                        {mockTestCases[selectedApi]?.map((tc) => (
                          <tr key={tc.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="pl-6 py-4 text-center cursor-grab text-slate-600 group-hover:text-primary">
                              <GripVertical size={14} className="mx-auto" />
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-bold text-text-main">{tc.name}</div>
                              <div className="text-[10px] text-text-mute italic mt-0.5">ID: {tc.id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                tc.priority === 'P0' ? "bg-error/10 text-error" : 
                                tc.priority === 'P1' ? "bg-warning/10 text-warning" : "bg-bg-base text-text-mute"
                              )}>
                                {tc.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 font-bold text-[10px]">
                                {tc.status === 'passed' ? <CheckCircle2 size={14} className="text-success" /> : 
                                 tc.status === 'failed' ? <AlertCircle size={14} className="text-error" /> : 
                                 <Clock size={14} className="text-text-mute" />}
                                <span className={cn(
                                  tc.status === 'passed' ? "text-success" : 
                                  tc.status === 'failed' ? "text-error" : "text-text-mute"
                                )}>{tc.status.toUpperCase()}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-text-mute">{tc.lastRun}</td>
                            <td className="px-6 py-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 hover:bg-primary/10 text-primary rounded transition-all"><Play size={14} /></button>
                                <button className="p-1.5 hover:bg-bg-base text-text-mute rounded transition-all"><Copy size={14} /></button>
                                <button className="p-1.5 hover:bg-error/10 text-error rounded transition-all"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-bg-base/30 gap-4">
                 <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary/30">
                   <Search size={32} />
                 </div>
                 <div className="text-center">
                   <h3 className="font-bold text-text-main mb-1 text-lg">请选择接口</h3>
                   <p className="text-xs text-text-mute max-w-xs mx-auto italic">从左侧资源树中选择一个接口进行用例管理或调试运行。</p>
                 </div>
              </div>
            )
          ) : testType === 'scenario' ? (
            // Scenario Testing View
            selectedScenario ? (
              <>
                <div className="p-8 border-b border-border-main bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
                   <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                           <div className="p-2 bg-primary/10 text-primary rounded-xl">
                              <Boxes size={24} />
                           </div>
                           <h2 className="text-2xl font-black text-white italic tracking-tight">{mockScenarios.find(s => s.id === selectedScenario)?.name}</h2>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">状态</span>
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success rounded-full border border-success/20 text-[10px] font-black">
                                 <CheckCircle2 size={12} /> {mockScenarios.find(s => s.id === selectedScenario)?.status.toUpperCase()}
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">最近执行</span>
                              <span className="text-xs font-bold text-slate-300">{mockScenarios.find(s => s.id === selectedScenario)?.lastRun}</span>
                           </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link 
                          to="/reports" 
                          className="flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white/5 transition-all shadow-xl shadow-black/20"
                        >
                           <ScrollText size={16} /> 查看历史报告
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:translate-y-[-2px] active:translate-y-[1px] transition-all shadow-xl shadow-primary/25">
                           <Play size={18} fill="currentColor" /> 运行场景
                        </button>
                      </div>
                   </div>
                   <Boxes size={180} className="absolute -bottom-16 -right-16 text-primary/5 rotate-12" />
                </div>

                <div className="flex-1 flex overflow-hidden">
                   <div className="flex-1 p-8 overflow-y-auto space-y-6 custom-scrollbar">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Layers size={14} className="text-primary" /> 执行步骤编排
                         </h3>
                         <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">+ 插入新步骤</button>
                      </div>

                      <div className="space-y-4">
                        {mockScenarios.find(s => s.id === selectedScenario)?.steps.map((step, idx) => (
                           <div key={idx} className="flex gap-4 group">
                              <div className="flex flex-col items-center">
                                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black font-mono text-slate-500 group-hover:border-primary/40 group-hover:text-primary transition-all">
                                    {idx + 1}
                                 </div>
                                 {idx < (mockScenarios.find(s => s.id === selectedScenario)?.steps.length || 0) - 1 && (
                                    <div className="w-px flex-1 bg-white/5 my-1" />
                                 )}
                              </div>
                              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 hover:bg-white/[0.04] transition-all flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div className={cn(
                                       "w-10 h-10 rounded-xl flex items-center justify-center",
                                       step.type === 'api' ? "bg-blue-500/10 text-blue-500" :
                                       step.type === 'delay' ? "bg-warning/10 text-warning" : "bg-purple-500/10 text-purple-500"
                                    )}>
                                       {step.type === 'api' ? <Globe size={20} /> : step.type === 'delay' ? <Clock size={20} /> : <FileCode size={20} />}
                                    </div>
                                    <div>
                                       <div className="text-sm font-bold text-white mb-1">{step.name || (step.type === 'delay' ? `延迟 ${step.config.ms}ms` : '脚本执行')}</div>
                                       <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                          {step.type === 'api' ? `TARGET ID: ${step.targetId}` : step.type === 'delay' ? 'WAIT FOR RESPONSE' : 'CUSTOM LOGIC'}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors"><Settings size={14} /></button>
                                    <button className="p-2 text-slate-500 hover:text-error transition-colors"><Trash2 size={14} /></button>
                                 </div>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>

                   <div className="w-80 border-l border-border-main bg-bg-card p-6 flex flex-col gap-6">
                      <div>
                         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">当前执行报告</h4>
                         {mockScenarios.find(s => s.id === selectedScenario)?.reportId ? (
                           <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center">
                                    <CheckCircle2 size={24} />
                                 </div>
                                 <div>
                                    <div className="text-xs font-bold text-white">通过验证</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SCORE: 98%</div>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">平均耗时</span>
                                    <span className="text-white font-bold">1.24s</span>
                                 </div>
                                 <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">接口成功率</span>
                                    <span className="text-white font-bold">100%</span>
                                 </div>
                              </div>
                              <div className="pt-2 flex gap-2">
                                 <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                                    <Download size={14} /> 下载 PDF
                                 </button>
                                 <button className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                 </button>
                              </div>
                           </div>
                         ) : (
                           <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center">
                              <p className="text-[10px] font-medium text-slate-500 italic">执行运行后生成动态分析报告</p>
                           </div>
                         )}
                      </div>

                      <div>
                         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">原子项目隔离</h4>
                         <div className="p-4 bg-bg-base/50 rounded-xl border border-white/5">
                            <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                              该场景已启用项目沙箱模式。所有中间变量及临时凭证将在执行结束后通过 <strong>Artifact Cleaner</strong> 自动回收。
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-bg-base/30 gap-6">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-primary/40 rotate-6">
                   <Boxes size={40} />
                 </div>
                 <div className="text-center">
                   <h3 className="font-black text-white mb-2 text-xl tracking-tight italic">场景测试中心</h3>
                   <p className="text-xs text-slate-500 max-w-[280px] mx-auto italic">
                     编排多个接口原子，模拟真实工业生产线业务流，进行深度链路压测与回归验证。
                   </p>
                 </div>
                 <button className="btn-primary px-8 py-3 rounded-2xl shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest transition-all hover:scale-105">
                   创建第一个测试场景
                 </button>
              </div>
            )
          ) : (
            // UI Testing View
            selectedUiTest ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                         {mockUiTests.find(u => u.id === selectedUiTest)?.device === 'mobile' ? <Smartphone size={24} /> : <MonitorSmartphone size={24} />}
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-white italic tracking-tight">{mockUiTests.find(u => u.id === selectedUiTest)?.name}</h2>
                         <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">设备库</span>
                            <span className="text-xs font-bold text-primary">{mockUiTests.find(u => u.id === selectedUiTest)?.device.toUpperCase()}</span>
                            <div className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">录制于</span>
                            <span className="text-xs font-bold text-slate-400">{mockUiTests.find(u => u.id === selectedUiTest)?.lastRun}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <button 
                         onClick={() => setShowUiReports(!showUiReports)}
                         className={cn(
                           "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                           showUiReports ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10"
                         )}
                      >
                        <ScrollText size={16} /> {showUiReports ? '回退到脚本' : '历史分析报告'}
                      </button>
                      {!showUiReports && (
                        <>
                          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/60 rounded-xl text-xs font-bold hover:bg-white/10 transition-all border border-white/5">
                            <Edit3 size={16} /> 编辑脚本
                          </button>
                          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:translate-y-[-2px] active:translate-y-[1px] transition-all shadow-xl shadow-primary/25">
                            <Play size={18} fill="currentColor" /> 开始录制/执行
                          </button>
                        </>
                      )}
                   </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                   {showUiReports ? (
                     <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="max-w-4xl mx-auto space-y-6">
                           <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <HistoryIcon size={14} className="text-primary" /> 执行日志回顾
                              </h3>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                   <Filter size={12} /> 筛选范围记录
                                </div>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 gap-4">
                              {mockUiReports.filter(r => r.uiTestId === selectedUiTest).map((report) => (
                                <div key={report.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
                                   <div className="flex gap-6">
                                      {report.screenshot && (
                                        <div className="w-48 h-28 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 relative group/img">
                                           <img src={report.screenshot} alt="UI Screenshot" className="w-full h-full object-cover transition-transform group-hover/img:scale-110" />
                                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                              <Eye size={20} className="text-white" />
                                           </div>
                                        </div>
                                      )}
                                      <div className="flex-1">
                                         <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                               <span className={cn(
                                                 "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                 report.status === 'passed' ? "bg-success/10 text-success border-success/20" : "bg-error/10 text-error border-error/20"
                                               )}>
                                                 {report.status}
                                               </span>
                                               <span className="text-[11px] font-bold text-slate-300">{report.timestamp}</span>
                                            </div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                                               DURATION: <span className="text-white">{report.duration}</span>
                                            </div>
                                         </div>
                                         <p className="text-sm text-slate-400 leading-relaxed font-medium mb-4">{report.summary}</p>
                                         <div className="flex items-center gap-2">
                                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">查看完整序列轨迹</button>
                                            <div className="w-1 h-1 bg-white/10 rounded-full" />
                                            <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">下载 HTML 报告</button>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                   ) : (
                     <>
                       {/* Device Preview Simulation */}
                       <div className="flex-1 bg-black/40 p-8 flex items-center justify-center overflow-auto relative">
                          <div className={cn(
                            "bg-[#0a0c10] rounded-[40px] border-8 border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden relative transition-all duration-500",
                            mockUiTests.find(u => u.id === selectedUiTest)?.device === 'mobile' ? "w-[300px] h-[600px]" : "w-[800px] h-[500px]"
                          )}>
                             {/* Mock Screen Content */}
                             <div className="absolute inset-x-0 top-0 h-6 bg-black flex items-center justify-center">
                                <div className="w-20 h-4 bg-white/5 rounded-full" />
                             </div>
                             <div className="w-full h-full p-6 flex flex-col gap-4 pt-10">
                                <div className="h-8 w-1/3 bg-white/5 rounded" />
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="h-32 bg-primary/10 rounded-xl border border-primary/20 animate-pulse" />
                                   <div className="h-32 bg-white/5 rounded-xl border border-white/5 shadow-inner" />
                                </div>
                                <div className="h-4 w-full bg-white/5 rounded" />
                                <div className="h-4 w-5/6 bg-white/5 rounded" />
                                <div className="h-4 w-4/6 bg-white/5 rounded" />
                                
                                <div className="mt-auto flex justify-between gap-4">
                                   <div className="h-10 flex-1 bg-white/5 rounded-lg" />
                                   <div className="h-10 flex-1 bg-primary/50 rounded-lg" />
                                </div>
                             </div>
                             
                             {/* Interaction Indicator */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full border border-primary/10 animate-ping opacity-0 group-hover:opacity-100" />
                          </div>
                       </div>

                       {/* Interaction Steps */}
                       <div className="w-80 border-l border-white/5 bg-bg-card flex flex-col">
                          <div className="p-6 border-b border-white/5 flex items-center justify-between">
                             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                               <MousePointer2 size={12} className="text-primary" /> 操作序列
                             </h3>
                             <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded font-bold text-slate-400">
                               {mockUiTests.find(u => u.id === selectedUiTest)?.steps.length} 步
                             </span>
                          </div>
                          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                             {mockUiTests.find(u => u.id === selectedUiTest)?.steps.map((step, i) => (
                               <div key={i} className="flex gap-3 group">
                                  <div className="flex flex-col items-center">
                                     <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500 font-mono">
                                        {i+1}
                                     </div>
                                     <div className="w-px flex-1 bg-white/5 my-1" />
                                  </div>
                                  <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-3 hover:border-primary/30 transition-all">
                                     <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{step.action}</span>
                                        <Eye size={12} className="text-slate-600" />
                                     </div>
                                     <div className="text-xs font-bold text-white mb-1 truncate">{step.target}</div>
                                     {step.value && (
                                       <div className="text-[10px] text-slate-500 truncate italic">VALUE: "{step.value}"</div>
                                     )}
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                     </>
                   )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-bg-base/30 gap-6">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-primary/40 -rotate-3">
                   <MonitorSmartphone size={40} />
                 </div>
                 <div className="text-center">
                   <h3 className="font-black text-white mb-2 text-xl tracking-tight italic">UI 自动化中心</h3>
                   <p className="text-xs text-slate-500 max-w-[280px] mx-auto italic">
                     基于视觉 AI 的无侵入式 UI 测试，模拟真实用户交互，动态验证多端适配与资产渲染。
                   </p>
                 </div>
                 <button className="btn-primary px-8 py-3 rounded-2xl shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest transition-all hover:scale-105">
                   录制首个 UI 脚本
                 </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Environment Variable Manager Overlay (Postman Style) */}
      {showEnvManager && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-white/5">
            <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-bg-base/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded flex items-center justify-center">
                  <Variable size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-text-main">管理环境变量</h3>
                  <p className="text-[10px] text-text-mute font-bold uppercase tracking-tight">{activeEnv.name}</p>
                </div>
              </div>
              <button onClick={() => setShowEnvManager(false)} className="p-2 hover:bg-bg-base rounded-full transition-colors cursor-pointer">
                <X size={20} className="text-text-mute" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs font-bold text-text-mute uppercase tracking-widest">Environment Variables</div>
                <button className="btn-secondary py-1 px-2 text-[10px]"><Plus size={12} /> 添加变量</button>
              </div>

              <div className="space-y-2 border border-border-main rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-bg-base text-[10px] text-text-mute font-bold uppercase tracking-widest border-b border-border-main">
                    <tr>
                      <th className="px-4 py-2">Variable</th>
                      <th className="px-4 py-2">Initial Value</th>
                      <th className="px-4 py-2">Current Value</th>
                      <th className="px-4 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-main">
                    {Object.entries(activeEnv.variables).map(([key, val]) => (
                      <tr key={key} className="hover:bg-bg-base/30 group">
                        <td className="px-4 py-3">
                          <input type="text" defaultValue={key} className="bg-transparent border-none focus:ring-0 text-xs font-mono font-bold w-full text-primary" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="text" defaultValue={val} className="bg-transparent border-none focus:ring-0 text-xs font-mono w-full text-text-sub" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="text" defaultValue={val} className="bg-transparent border-none focus:ring-0 text-xs font-mono w-full text-text-main" />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="p-1 text-text-mute hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Empty row for new */}
                    <tr className="bg-bg-base/10">
                      <td className="px-4 py-3"><input type="text" placeholder="New key..." className="bg-transparent border-none text-xs w-full italic" /></td>
                      <td className="px-4 py-3"><input type="text" placeholder="New value..." className="bg-transparent border-none text-xs w-full italic" /></td>
                      <td className="px-4 py-3"><input type="text" placeholder="New value..." className="bg-transparent border-none text-xs w-full italic" /></td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border-main bg-bg-base/30 flex justify-end gap-3">
               <button onClick={() => setShowEnvManager(false)} className="btn-secondary h-9 px-4 text-xs font-bold">取消</button>
               <button onClick={() => setShowEnvManager(false)} className="btn-primary h-9 px-6 text-xs font-bold shadow-lg shadow-primary/20">保存更改</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
