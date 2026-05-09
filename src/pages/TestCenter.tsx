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
  History as HistoryIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Project, ApiInterface, TestCase, Environment } from '../types';

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

export const TestCenter = () => {
  const [activeProject, setActiveProject] = useState(mockProjects[0]);
  const [activeEnv, setActiveEnv] = useState<Environment>(activeProject.environments[0]);
  const [selectedApi, setSelectedApi] = useState<string | null>('API-001');
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
          <div className="p-4 border-b border-border-main flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Layers size={14} className="text-primary" /> 资源组织树
            </h3>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-500 hover:text-primary transition-colors"><Plus size={14} /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {folders.filter(f => !f.parentId).map(folder => (
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
                  <div className="ml-4 pl-2 border-l border-border-main space-y-1 pt-1">
                    {folders.filter(f => f.parentId === folder.id).map(sub => (
                       <div key={sub.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] text-xs font-medium text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                          <FolderOpen size={14} className="text-warning opacity-70" />
                          <span>{sub.name}</span>
                       </div>
                    ))}
                    
                    {mockApis.filter((api, i) => folder.id === 'f3' ? i < 2 : folder.id === 'f1' ? i === 2 : false).map((api) => (
                      <div 
                        key={api.id}
                        onClick={() => setSelectedApi(api.id)}
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
            ))}
          </div>
        </div>

        {/* Main Content Area: Use Cases List */}
        <div className="flex-1 flex flex-col bg-bg-card border border-border-main rounded-xl overflow-hidden shadow-sm">
          {selectedApi ? (
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
