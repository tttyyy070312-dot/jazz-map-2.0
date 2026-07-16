import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Compass, Globe, FileText, ArrowRight, CornerDownLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIGuideProps {
  currentContext: {
    cityId?: string | null;
    musicianId?: string | null;
    decade?: number;
  };
}

const SAMPLE_PROMPTS = [
  { text: "告诉我从新奥尔良到芝加哥大迁徙的历史 ✦", query: "告诉我关于新奥尔良传统爵士到芝加哥大迁徙的历史，是什么促使了这一变迁？以及有哪些音乐家参与其中？" },
  { text: "Miles Davis 又是如何影响约翰·柯川的？ ✦", query: "迈尔斯·戴维斯(Miles Davis)和约翰·柯川(John Coltrane)之间有什么历史关系？他们是如何在《Kind of Blue》等专辑里互相启发的？" },
  { text: "为巴黎设计一份冷爵士乐主题游览路线 ✦", query: "请作为音乐历史学家，为我策划一份巴黎(Paris)的爵士乐主题游览路线（Jazz Road Trip），结合那里的知名俱乐部（例如圣日耳曼、Caveau de la Huchette）和大师在巴黎留下的故事。" },
  { text: "Bossa Nova 是如何席卷纽约的？ ✦", query: "巴西里约热内卢诞生的波萨诺瓦(Bossa Nova)是如何在20世纪60年代传入纽约并风靡全球的？有什么代表作？" }
];

export default function AIGuide({ currentContext }: AIGuideProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `你好！我是你的 **AI 爵士乐理与史学导览员**。☕️\n\n爵士乐不是冷冰冰的年份表，而是一首随着城市流转、跨越重洋的地理空间诗歌。你可以问我关于任何城市、俱乐部、名盘、音乐家网络的问题。或者我可以为你定制一条专属的 **「爵士历史朝圣路线」**！\n\n*你可以输入下方的问题，或者直接在下方文本框中与我对话。*`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/jazz-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((msg) => ({
            role: msg.role,
            content: msg.content
          })),
          context: currentContext
        })
      });

      if (!response.ok) {
        throw new Error("与后端 AI 导览模块连接失败，请确认您的 API 密钥已正确配置。");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "连接失败，请确认 Secrets 配置。");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely render custom basic markdown in the chat window
  const renderMarkdown = (text: string) => {
    // Split into paragraphs/blocks
    const blocks = text.split(/\n\n+/);
    
    return blocks.map((block, bIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Check for custom header styles
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={bIdx} className="text-xs font-bold text-[#C9A227] mt-3 mb-1.5 font-sans tracking-wide">
            {parseInlineBold(trimmed.replace("### ", ""))}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={bIdx} className="text-sm font-extrabold text-white mt-4 mb-2 border-b border-zinc-900 pb-1 font-serif">
            {parseInlineBold(trimmed.replace("## ", ""))}
          </h3>
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={bIdx} className="text-base font-black text-white mt-4 mb-2.5 font-serif">
            {parseInlineBold(trimmed.replace("# ", ""))}
          </h2>
        );
      }

      // Check for bullet lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const lines = trimmed.split("\n");
        return (
          <ul key={bIdx} className="list-disc pl-5 my-2 space-y-1 text-zinc-300 text-xs">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[-*]\s+/, "");
              return <li key={lIdx}>{parseInlineBold(cleanLine)}</li>;
            })}
          </ul>
        );
      }

      // Default paragraph
      return (
        <p key={bIdx} className="text-zinc-300 text-xs leading-relaxed mb-2.5 font-sans">
          {parseInlineBold(trimmed)}
        </p>
      );
    });
  };

  const parseInlineBold = (text: string) => {
    // Regex split on standard markdown bold syntax **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="text-white font-bold bg-[#C9A227]/5 px-0.5 rounded">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-[#121212] border border-[#C9A227]/20 rounded-xl flex flex-col h-[520px] md:h-[600px] shadow-2xl relative overflow-hidden text-left backdrop-blur-sm">
      
      {/* Decorative Golden Spine/Rail */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#C9A227]/40"></div>

      {/* 1. COMPONENT HEADER */}
      <div className="bg-[#0b0b0d] border-b border-[#C9A227]/10 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 pl-1.5">
          <div className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse"></div>
          <div>
            <h3 className="text-sm font-sans font-bold text-zinc-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="serif text-[#C9A227]">AI 爵士乐理与历史导览 (Jazz Guide)</span>
            </h3>
            <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
              Powered by Gemini 3.5 Flash · Digital Humanities Expert
            </p>
          </div>
        </div>

        {/* Current contextual indicator */}
        <div className="hidden sm:flex items-center gap-1 bg-zinc-950/80 border border-[#C9A227]/20 rounded px-2 py-0.5 text-[9px] font-mono text-zinc-400">
          <Compass className="w-3 h-3 text-[#C9A227]/70" />
          <span>正在监听地图：</span>
          <span className="text-[#C9A227] font-bold">
            {currentContext.decade ? `${currentContext.decade}s` : "实时"}
          </span>
        </div>
      </div>

      {/* 2. CHAT FEED CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          const isAI = msg.role === "assistant";
          return (
            <div
              key={index}
              className={`flex gap-3.5 max-w-[85%] ${
                isAI ? "self-start" : "ml-auto flex-row-reverse"
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 border text-[11px] font-mono font-bold ${
                  isAI
                    ? "bg-[#181510] text-[#C9A227] border-[#C9A227]/30"
                    : "bg-zinc-900 text-zinc-300 border-zinc-800"
                }`}
              >
                {isAI ? "AI" : "ME"}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-xl p-3.5 text-xs shadow-md border ${
                  isAI
                    ? "bg-[#0b0b0d] border-[#C9A227]/10 text-zinc-300"
                    : "bg-[#1c1810]/60 border-[#C9A227]/20 text-zinc-200"
                }`}
              >
                {isAI ? renderMarkdown(msg.content) : <p className="leading-relaxed font-sans">{msg.content}</p>}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-3.5 max-w-[80%] self-start">
            <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 bg-[#181510] text-[#C9A227] border border-[#C9A227]/30 text-[11px] font-mono">
              AI
            </div>
            <div className="bg-[#0b0b0d] border border-[#C9A227]/10 text-zinc-400 rounded-xl p-3 text-xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                乐史学家正在检索经典档案并绘制声谱...
              </span>
            </div>
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="bg-rose-950/25 border border-rose-900/60 p-3.5 rounded-lg text-[11px] text-rose-300 leading-relaxed font-mono flex items-start gap-2">
            <span className="text-rose-400 font-bold shrink-0">⚠️ Error:</span>
            <div className="space-y-1">
              <p>{error}</p>
              <p className="text-[10px] text-zinc-500">
                请点击右上角 **Settings &gt; Secrets**，添加名为 \`GEMINI_API_KEY\` 的密钥，并保存后刷新页面即可启用 AI 导览！
              </p>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* 3. PROMPT SUGESTIONS RAILS */}
      <div className="px-4 py-2 bg-[#0b0b0d] border-t border-[#C9A227]/10 flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden scrollbar-none">
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSendMessage(prompt.query)}
            className="shrink-0 bg-zinc-900/40 hover:bg-[#1c1810]/40 border border-[#C9A227]/10 hover:border-[#C9A227]/40 px-3 py-1.5 rounded-full text-[10px] text-zinc-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            {prompt.text}
          </button>
        ))}
      </div>

      {/* 4. CHAT INPUT SECTION */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="bg-[#0b0b0d] border-t border-[#C9A227]/10 p-3 flex gap-2 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="向 AI 爵士导览提问... (例如: 谁录制了《Kind of Blue》？)"
          className="flex-1 bg-zinc-950 text-xs border border-[#C9A227]/20 rounded-lg px-3.5 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-hidden focus:border-[#C9A227]/50 font-sans transition-all disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-zinc-900 hover:bg-[#1a160f] text-zinc-300 hover:text-[#C9A227] border border-[#C9A227]/20 hover:border-[#C9A227]/50 p-2.5 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
