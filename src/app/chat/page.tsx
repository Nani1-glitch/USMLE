"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Msg { role: "user" | "assistant"; content: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [disclaimer, setDisclaimer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    setError(null);
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages: next }) });
    if (!res.ok || !res.body) {
      setError("Chat error. Check your API key and network.");
      setLoading(false);
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistant = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const evt = JSON.parse(trimmed);
          if (evt.event === "meta" && evt.data?.disclaimer) setDisclaimer(evt.data.disclaimer);
          if (evt.event === "token") {
            assistant += evt.data;
            setMessages([...next, { role: "assistant", content: assistant }]);
          }
        } catch {
          // ignore non-JSON lines
        }
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Educational Disclaimer */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm text-gray-600 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <span className="text-xs font-medium">For Educational Purposes Only</span>
        </div>
      </div>

      {/* Detailed Medical Professional Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main Medical Professional Silhouette */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] opacity-15 blur-2xl">
          <div className="w-full h-full relative">
            {/* Medical Professional Figure */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-80 relative">
                {/* Head with Medical Cap */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-blue-300/40 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-blue-400/30 rounded-full"></div>
                
                {/* Body with Medical Coat */}
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-36 h-52 bg-cyan-300/40 rounded-t-full"></div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-cyan-400/30 rounded-t-full"></div>
                
                {/* Stethoscope */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-emerald-400/50 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform translate-x-8 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                
                {/* Arms */}
                <div className="absolute top-28 left-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                <div className="absolute top-28 right-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                
                {/* Hands */}
                <div className="absolute top-46 left-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                <div className="absolute top-46 right-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                
                {/* Medical Bag */}
                <div className="absolute top-50 left-8 w-12 h-16 bg-emerald-400/30 rounded-lg"></div>
                <div className="absolute top-52 left-10 w-8 h-2 bg-emerald-500/40 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Medical Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full relative">
            {/* Medical Cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-white/30 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 w-2 h-full bg-white/30 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full relative">
            {/* Heart Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-8 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-cyan-300/20 to-emerald-300/20 rounded-full relative">
            {/* DNA Helix */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 relative z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-200 group">
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/uploads" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-200 group">
                <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="font-medium">Knowledge Base</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-red-800 font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Premium Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-8">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent mb-6">AI Medical Tutor</h3>
                <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">Ask questions about any medical topic for personalized explanations and comprehensive learning. Get expert-level insights tailored to your USMLE preparation.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Explain cardiac physiology", "What is the mechanism of ACE inhibitors?", "Describe the pathophysiology of diabetes", "How does the immune system work?"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-2xl text-sm font-medium hover:from-blue-50 hover:to-emerald-50 hover:text-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} group`}>
                  <div className={`max-w-4xl ${m.role === "user" ? "order-2" : "order-1"}`}>
                    <div className={`flex items-start space-x-3 ${m.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        m.role === "user" 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                          : "bg-gradient-to-r from-green-500 to-green-600"
                      }`}>
                        {m.role === "user" ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`relative p-4 rounded-2xl shadow-md text-gray-800 ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-blue-50 to-blue-100 rounded-br-none"
                          : "bg-gray-50 rounded-bl-none"
                      }`}>
                        <div className="whitespace-pre-wrap leading-relaxed text-sm">{m.content}</div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Premium Input Area */}
          <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-blue-50/50 p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex gap-4"
            >
              <div className="flex-1 relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-2xl px-8 py-5 pr-20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 text-lg"
                  placeholder="Ask about any medical topic..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  {loading ? (
                    <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}