import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Terminal, 
  Settings, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  Copy, 
  ListFilter,
  Maximize2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useParams, Link } from 'react-router-dom';

interface ExecutionStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: string;
  info?: string;
}

const initialSteps: ExecutionStep[] = [
  { id: '1', name: 'Identity Auth', status: 'success', duration: '1.2s' },
  { id: '2', name: 'Resource Allocation', status: 'running', info: 'Running...' },
  { id: '3', name: 'Network Config', status: 'pending' },
  { id: '4', name: 'Security Group Sync', status: 'pending' },
  { id: '5', name: 'Backup Routine', status: 'skipped', info: 'Skipped by Logic' },
  { id: '6', name: 'Deployment Verify', status: 'pending' },
];

export const ExecutionMonitor = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'stopped'>('running');
  const [steps, setSteps] = useState(initialSteps);
  const [logs, setLogs] = useState<string[]>([
    "[10:24:01.32] Initializing execution environment...",
    "[10:24:02.11] Authenticating via OIDC for: SKL-4092-X",
    "[10:24:02.55] SUCCESS: User validated. Context loaded.",
    "[10:24:03.01] STARTING STEP [Resource Allocation]",
    "[10:24:03.15] Calling cloud provider API: compute.v1.instances.insert",
    "[10:24:04.22] Waiting for operation: operation-16982231-5f2...",
    "[10:24:05.10] Status: IN_PROGRESS (34% complete)",
    "[10:24:06.45] Status: IN_PROGRESS (68% complete)",
    "[10:24:08.20] Attaching block storage volumes: [vol-89221]",
    "[10:24:09.11] >> PROCESSING PAYLOAD DATA..."
  ]);

  const [command, setCommand] = useState('');
  const [isInteractiveSession, setIsInteractiveSession] = useState(false);

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false }) + '.' + Math.floor(Math.random() * 100);
    
    if (command.startsWith('/btw')) {
      const question = command.replace('/btw', '').trim();
      setLogs(prev => [...prev, `[${timestamp}] (BTW) USER: ${question}`, `[${timestamp}] BOT: This question won't interrupt the workflow. Current step is still processing.`]);
    } else {
      setLogs(prev => [...prev, `[${timestamp}] > ${command}`]);
      if (command.toLowerCase().includes('pause')) {
        setStatus('paused');
        setLogs(prev => [...prev, `[${timestamp}] SYSTEM: Workflow paused by user command.`]);
      } else if (command.toLowerCase().includes('resume')) {
        setStatus('running');
        setLogs(prev => [...prev, `[${timestamp}] SYSTEM: Resuming workflow execution.`]);
      }
    }
    setCommand('');
  };


  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -mt-2">
      {/* Header Info Bar */}
      <div className="bg-bg-card border border-white/5 rounded-t-2xl p-6 flex items-center justify-between shadow-2xl shadow-black/40">
        <div className="flex items-center gap-10">
          <div>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Skill Workflow</div>
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              Cloud-Scale Resource Provisioner
              <span className="px-2 py-0.5 bg-white/5 text-slate-400 text-[10px] font-black font-mono rounded-md border border-white/5">v2.4.0</span>
            </h2>
          </div>
          <div className="flex gap-8">
            <div className="border-l border-white/5 pl-8">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Code</div>
              <div className="text-xs font-mono font-black text-white/80 tracking-tighter">SKL-4092-X</div>
            </div>
            <div className="border-l border-white/5 pl-8">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Environment</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-warning rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-xs font-black uppercase text-white/80">PROD</span>
              </div>
            </div>
            <div className="border-l border-white/5 pl-8">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Run ID</div>
              <div className="text-xs font-mono font-black text-slate-400 tracking-tighter">#{id || 'RUN-883921'}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 bg-black/30 p-1.5 rounded-xl border border-white/5">
           <button className="px-5 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary/20">Skill Workflow</button>
           <button className="px-5 py-2 text-slate-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all">Command Template</button>
        </div>
      </div>

      {/* Main Execution Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Operations & Params */}
        <div className="w-[320px] bg-bg-card border-r border-white/5 flex flex-col p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Operations</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="btn-secondary h-11 text-[10px] font-black uppercase tracking-wider justify-center"><ShieldCheck size={14} /> Pre-check</button>
              <button className="btn-secondary h-11 text-[10px] font-black uppercase tracking-wider justify-center"><UserCheck size={14} /> Approval</button>
            </div>
            <button className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl h-12 flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 mb-3 active:scale-95">
               <Play size={20} fill="currentColor" /> Start Execution
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary h-11 text-[10px] font-black uppercase tracking-wider justify-center opacity-50"><Pause size={14} /> Pause</button>
              <button className="border border-primary/30 text-primary hover:bg-primary/5 h-11 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all"><Square size={14} fill="currentColor" /> Terminate</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Parameters</h3>
              <button className="text-[10px] text-primary font-black uppercase tracking-wider hover:underline">Reset Defaults</button>
            </div>
            <div className="space-y-4">
               {[
                 { label: 'tenant_id', val: 'TX_GLOBAL_882' },
                 { label: 'app_key', val: 'AK_9921_PUB' },
                 { label: 'secret_token', val: '••••••••••••••••', type: 'password' },
                 { label: 'region_scope', val: 'ap-southeast-1', options: true },
               ].map((field, i) => (
                 <div key={i} className="space-y-1.5 focus-within:text-primary transition-colors">
                   <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">{field.label}</label>
                   <div className="relative group">
                     {field.options ? (
                       <div className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-white flex justify-between items-center cursor-pointer group-hover:border-primary/50 transition-colors">
                         {field.val}
                         <ChevronRight size={14} className="rotate-90 text-slate-500" />
                       </div>
                     ) : (
                       <input 
                         type={field.type || 'text'} 
                         defaultValue={field.val} 
                         className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                       />
                     )}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Workflow Steps */}
        <div className="w-[300px] bg-bg-card border-r border-white/5 p-6 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Workflow Steps</h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{steps.length} Steps</span>
          </div>
          
          <div className="relative space-y-0">
             {steps.map((step, i) => (
               <div key={step.id} className="relative pl-8 pb-10 group last:pb-0">
                 {/* Connection Line */}
                 {i !== steps.length - 1 && (
                   <div className={cn(
                     "absolute left-4 top-8 w-px bottom-0",
                     step.status === 'success' ? "bg-primary shadow-[0_0_8px_rgba(236,28,36,0.5)]" : "bg-white/5"
                   )} />
                 )}
                 
                 {/* Step Icon */}
                 <div className={cn(
                   "absolute left-0 top-1 w-8 h-8 rounded-full border flex items-center justify-center z-10 transition-all",
                   step.status === 'success' ? "bg-primary border-primary text-white shadow-xl shadow-primary/40" :
                   step.status === 'running' ? "bg-bg-card border-primary text-primary animate-pulse shadow-xl shadow-primary/20" :
                   step.status === 'pending' ? "bg-bg-card border-white/10 text-slate-600" :
                   step.status === 'skipped' ? "bg-white/5 border-white/5 text-slate-700" :
                   "bg-bg-card border-error text-error"
                 )}>
                   {step.status === 'success' ? <CheckCircle2 size={16} strokeWidth={3} /> :
                    step.status === 'running' ? <Loader2 size={16} strokeWidth={3} className="animate-spin" /> :
                    step.status === 'skipped' ? <AlertCircle size={16} strokeWidth={3} className="opacity-50" /> :
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                 </div>

                 {/* Step Content */}
                 <div className={cn(
                   "p-3 rounded-xl border transition-all",
                   step.status === 'running' ? "bg-primary/5 border-primary/20" :
                   "bg-transparent border-transparent"
                 )}>
                    <div className={cn(
                      "text-sm font-black transition-colors tracking-tight",
                      step.status === 'running' ? "text-primary" :
                      step.status === 'pending' || step.status === 'skipped' ? "text-slate-600" : "text-white"
                    )}>
                      {step.name}
                    </div>
                    {(step.duration || step.info) && (
                      <div className="text-[10px] font-bold mt-1 text-slate-500 uppercase">
                        {step.status === 'success' ? (
                          <span className="text-primary/70">Success ({step.duration})</span>
                        ) : step.info}
                      </div>
                    )}
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Executor Console */}
        <div className="flex-1 bg-black/40 flex flex-col relative overflow-hidden">
           {/* Console Header */}
           <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
              <div className="flex items-center gap-3">
                 <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={14} /> Executor Console
                 </h3>
                 <div className="flex items-center gap-1.5 ml-4">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-success uppercase tracking-widest">Streaming</span>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-white/40">
                 <button className="hover:text-white transition-colors"><Copy size={14} /></button>
                 <button className="hover:text-white transition-colors"><ListFilter size={14} /></button>
                 <button className="hover:text-white transition-colors"><Maximize2 size={14} /></button>
              </div>
           </div>

           {/* Console Content */}
           <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed custom-scrollbar">
              <div className="space-y-1">
                 {logs.map((log, i) => {
                    const isUser = log.includes('> ');
                    const isBtw = log.includes('(BTW)');
                    const isBot = log.includes('BOT:');
                    const isSystem = log.includes('SYSTEM:');
                    
                    return (
                      <div key={i} className={cn(
                        "flex gap-4 p-1 rounded-sm transition-colors",
                        isUser ? "bg-primary/5 -mx-2 px-3" : 
                        isBtw ? "bg-white/5 border-l-2 border-primary/20 -mx-2 px-3 italic" : ""
                      )}>
                         <span className="text-white/20 whitespace-nowrap">{log.match(/\[(.*?)\]/)?.[0]}</span>
                         <span className={cn(
                           "flex-1",
                           isUser ? "text-primary font-bold" :
                           isBot ? "text-success font-bold" :
                           isSystem ? "text-warning italic" :
                           log.includes('SUCCESS') ? "text-success" :
                           log.includes('STARTING') ? "text-primary font-bold" :
                           log.includes('>>') ? "text-white/80" : "text-white/40"
                         )}>
                           {log.replace(/\[.*?\]\s+/, '')}
                         </span>
                      </div>
                    );
                 })}
                 
                 {/* Interactive Prompt Simulation */}
                 {status === 'running' && (
                    <div className="flex gap-4 p-2 bg-primary/10 -mx-2 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                       <span className="text-primary font-bold animate-pulse">?</span>
                       <div className="flex-1">
                          <div className="text-primary font-bold mb-1">INTERACTIVE REQUEST: Confirm VPC modification</div>
                          <div className="text-white/60 mb-2">Workflow is waiting for manual confirmation to modify security group "sg-production-api".</div>
                          <div className="flex gap-2">
                             <button onClick={() => setLogs(p => [...p, `[${new Date().toLocaleTimeString()}]: Log: Manual approval granted.`])} className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded hover:bg-primary/90 transition-all">Approve</button>
                             <button className="px-3 py-1 bg-white/10 text-white/50 text-[10px] font-black uppercase rounded hover:bg-white/20 transition-all">Details</button>
                          </div>
                       </div>
                    </div>
                 )}

                 {/* JSON Payload Block */}
                 <div className="mt-4 ml-24 bg-white/5 rounded-lg p-6 border border-white/10 max-w-lg">
                    <pre className="text-warning-light">
{`{
  "request_id": "req_883210x",
  "status": "provisioning",
  "metadata": {
    "region": "ap-southeast-1",
    "instance_type": "n2-standard-4"
  }
}`}
                    </pre>
                 </div>
              </div>
           </div>

           {/* Console Footer & Input */}
           <div className="border-t border-white/5 bg-black/20">
              <form onSubmit={handleSendCommand} className="flex items-center gap-3 px-4 py-3">
                 <div className="text-primary opacity-50"><ChevronRight size={16} strokeWidth={3} /></div>
                 <input 
                   type="text" 
                   value={command}
                   onChange={(e) => setCommand(e.target.value)}
                   placeholder="输入指令 (例如: /btw 为什么这一步变慢了?)..." 
                   className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono text-white placeholder:text-white/10"
                 />
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/10 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded">Enter to send</span>
                 </div>
              </form>
              <div className="h-8 px-6 bg-black/40 border-t border-white/5 flex items-center justify-between">
                 <div className="text-[9px] text-white/20 uppercase font-black tracking-widest">Executor: worker-node-04-sg</div>
                 <div className="text-[9px] text-white/25 uppercase font-black tracking-widest flex items-center gap-2">
                   <div className="w-1 h-1 bg-success rounded-full" />
                   Tailing: Last 500 lines
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
