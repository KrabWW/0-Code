import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Plus, 
  MoreHorizontal, 
  Paperclip, 
  Mic, 
  Image as ImageIcon,
  Terminal,
  Cpu,
  Zap,
  Sparkles,
  Command,
  History as HistoryIcon,
  Trash2,
  Copy,
  CheckCircle2,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  skillId?: string;
}

const mockSkills = [
  { id: 's1', name: 'PLC 专家诊断', description: '深度解析工业协议', icon: Cpu },
  { id: 's2', name: 'Auto-Test 助手', description: '自动生成测试用例', icon: Terminal },
  { id: 's3', name: '数据清洗大师', description: '快速处理非结构化数据', icon: Zap },
];

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是您的工业 AI 助手。我已经准备好为您处理技能执行、数据分析或编写自动化脚本。您可以从左侧选择一个特定的技能，或者直接向我提问。',
      timestamp: '10:00 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `我正在使用 "${mockSkills[0].name}" 为您分析。根据当前的系统上下文，我建议您检查第 4 号节点的响应延迟。这是一个模拟回复，您可以稍后配置正式的运行底座来接管我的逻辑。`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        skillId: 's1'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 antialiased">
      {/* Sessions Sidebar */}
      <div className="w-72 flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus size={20} strokeWidth={3} /> 开启新对话
        </button>

        <div className="flex-1 card bg-bg-card flex flex-col overflow-hidden border-t-4 border-t-primary">
          <div className="p-4 border-b border-border-main bg-bg-base/30">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mute" />
              <input 
                type="text" 
                placeholder="搜索历史对话..." 
                className="w-full bg-bg-card border border-border-main rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <div className="text-[10px] font-black text-text-mute uppercase tracking-widest px-3 py-2">近期会话</div>
            {[
               { id: 1, title: 'PLC 协议解析', date: '今天', active: true },
               { id: 2, title: '物料分拣逻辑调试', date: '昨天', active: false },
               { id: 3, title: '环境配置审计报告', date: '2天前', active: false },
            ].map(session => (
              <div 
                key={session.id}
                className={cn(
                  "group p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between",
                  session.active ? "bg-primary/10 text-primary" : "hover:bg-bg-base text-text-main"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={cn("w-2 h-2 rounded-full", session.active ? "bg-primary" : "bg-text-mute/30")} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">{session.title}</span>
                    <span className="text-[10px] opacity-60 font-medium">{session.date}</span>
                  </div>
                </div>
                <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5 rounded">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 bg-primary/10 border-primary/20">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-bg-card rounded-xl flex items-center justify-center shadow-sm text-primary">
               <Cpu size={20} />
             </div>
             <div>
               <div className="text-[10px] font-black text-text-mute uppercase tracking-widest leading-none mb-1">当前底座</div>
               <div className="text-xs font-black text-primary">CodeX Engine</div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-bg-card border border-border-main rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-bg-card/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
               <Bot size={24} />
            </div>
            <div>
               <h3 className="font-black text-text-main">AI 控制台</h3>
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-success">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  实时运行中 (Ready to execute)
               </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary h-9 px-3 text-xs"><HistoryIcon size={14} /> 运行历史</button>
            <button className="btn-secondary h-9 px-3 text-xs text-error hover:bg-error/10 hover:border-error/20"><Trash2 size={14} /> 清空当前</button>
          </div>
        </div>

        {/* Message List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-bg-base/20"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[85%] group",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-2 px-1">
                {msg.role === 'assistant' && <Bot size={14} className="text-primary" />}
                <span className="text-[10px] font-black text-text-mute uppercase tracking-widest">
                  {msg.role === 'assistant' ? 'Industrial Assistant' : 'Operator'}
                </span>
                <span className="text-[10px] text-text-mute opacity-50">{msg.timestamp}</span>
                {msg.role === 'user' && <User size={14} className="text-text-mute" />}
              </div>
              
              <div className={cn(
                "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all",
                msg.role === 'user' 
                  ? "bg-primary text-white rounded-tr-none shadow-primary/10" 
                  : "bg-bg-card border border-border-main text-text-main shadow-sm rounded-tl-none"
              )}>
                {msg.content}
              </div>

              {msg.skillId && (
                <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-bg-base border border-border-main rounded-lg text-[10px] font-bold text-text-sub group-hover:border-primary/30 transition-all">
                  <Sparkles size={12} className="text-primary" />
                  由 <span>{mockSkills.find(s => s.id === msg.skillId)?.name}</span> 强力驱动
                  <CheckCircle2 size={12} className="text-success ml-auto" />
                </div>
              )}

              <div className={cn(
                "mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                msg.role === 'user' ? "flex-row-reverse" : ""
              )}>
                <button className="p-1 px-2 hover:bg-white/5 text-text-mute rounded text-[10px] font-bold flex items-center gap-1">
                  <Copy size={12} /> 复制内容
                </button>
                {msg.role === 'assistant' && (
                  <button className="p-1 px-2 hover:bg-primary/10 text-primary rounded text-[10px] font-bold flex items-center gap-1">
                    <Zap size={12} /> 提交到技能中心
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-mute">
                <Bot size={20} />
              </div>
              <div className="flex items-center gap-1.5 bg-bg-card/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/5 shadow-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="p-6 bg-bg-card border-t border-border-main">
          <div className="flex flex-col gap-4 bg-bg-base/50 border border-border-main rounded-2xl p-2 focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/30 transition-all">
            <textarea 
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="输入指令，例如：'分析最近 24 小时的 PLC 异常日志' 或 '为我的新技能编写一个连接器测试用例'..."
              className="w-full bg-transparent border-none outline-none p-3 text-sm resize-none placeholder:text-text-mute/50 leading-relaxed font-medium"
            />
            
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1">
                {[
                   { icon: Paperclip, label: '附件' },
                   { icon: ImageIcon, label: '图片' },
                   { icon: Mic, label: '语音' },
                   { icon: Command, label: '捷径' },
                ].map((act, i) => (
                  <button key={i} className="p-2 hover:bg-bg-card rounded-xl text-text-mute hover:text-primary transition-all group relative">
                    <act.icon size={18} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] rounded font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                       {act.label}
                    </span>
                  </button>
                ))}
                <div className="h-6 w-px bg-border-main mx-2" />
                <div className="flex items-center gap-2">
                   {mockSkills.map(s => (
                     <button key={s.id} className="px-3 py-1.5 hover:bg-bg-card border border-transparent hover:border-border-main rounded-xl text-[10px] font-black text-text-mute hover:text-primary transition-all flex items-center gap-1.5 uppercase tracking-tighter shadow-sm hover:shadow-md">
                       <s.icon size={14} /> {s.name}
                     </button>
                   ))}
                </div>
              </div>
              
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-3 rounded-xl flex items-center gap-2 transform active:scale-95 transition-all shadow-xl",
                  input.trim() 
                    ? "bg-primary text-white shadow-primary/30" 
                    : "bg-bg-base text-text-mute shadow-none grayscale cursor-not-allowed"
                )}
              >
                <span className="text-xs font-black uppercase tracking-widest px-2">发送指令</span>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Send size={16} strokeWidth={3} />
                </div>
              </button>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <p className="text-[9px] font-black text-text-mute uppercase tracking-widest opacity-40">
              Enterprise Grade AI Assistant • Powered by CodeX & RJ-Runtime-01
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
