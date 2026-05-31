"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, AlertCircle, HelpCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatWidgetProps {
  productContext?: string
}

const SUGGESTED_QUESTIONS = [
  "Mon produit est-il soumis au GPSR ?",
  "Comment obtenir le marquage CE ?",
  "Ai-je besoin d'une Personne Responsable EU ?",
]

const STORAGE_KEY = "conforva-chat-history"
const MAX_STORED_MESSAGES = 20
const CHAR_WARNING_THRESHOLD = 500

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: "tdot 1.2s ease-in-out infinite", animationDelay: "0ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: "tdot 1.2s ease-in-out infinite", animationDelay: "180ms" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: "tdot 1.2s ease-in-out infinite", animationDelay: "360ms" }} />
    </div>
  )
}

export function ChatWidget({ productContext }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Message[]
        if (Array.isArray(parsed)) setMessages(parsed.slice(-MAX_STORED_MESSAGES))
      }
    } catch {}
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!hasLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)))
    } catch {}
  }, [messages, hasLoaded])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 96) + "px"
  }, [input])

  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 100)
  }, [isOpen])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed }
      const aiMsgId = crypto.randomUUID()
      const aiMsg: Message = { id: aiMsgId, role: "assistant", content: "" }

      setMessages((prev) => [...prev, userMsg, aiMsg])
      setInput("")
      setIsLoading(true)

      try {
        const history = [...messages, userMsg].slice(-20).map(({ role, content }) => ({ role, content }))
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, productContext: productContext || undefined }),
        })

        if (!res.ok || !res.body) {
          const errText =
            res.status === 503 ? "Service indisponible pour le moment." :
            res.status === 401 ? "Session expirée. Reconnectez-vous." :
            "Quelque chose s'est mal passé. Réessayez."
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: errText } : m))
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: m.content + chunk } : m))
        }
      } catch {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: "Erreur de connexion. Vérifiez votre réseau." } : m))
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, productContext]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearHistory = () => {
    setMessages([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const charCount = input.length
  const showCharWarning = charCount >= CHAR_WARNING_THRESHOLD

  return (
    <>
      <style>{`
        @keyframes tdot { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes slide-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes msg-in { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        .chat-panel { animation: slide-up .22s cubic-bezier(.16,1,.3,1) forwards; }
        .chat-msg { animation: msg-in .18s ease-out forwards; }
      `}</style>

      {/* Toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? "Fermer l'aide" : "Ouvrir l'aide"}
          className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 flex items-center justify-center shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isOpen
            ? <X className="w-5 h-5 text-white" />
            : <HelpCircle className="w-5 h-5 text-white" />
          }
        </button>
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="chat-panel fixed bottom-[76px] right-6 z-50 w-[340px] md:w-[380px] rounded-2xl overflow-hidden flex flex-col bg-white"
          style={{
            maxHeight: "calc(100vh - 100px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">Aide conformité</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[11px] text-gray-400">En ligne</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Effacer
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.length === 0 && (
              <div className="space-y-4 pt-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3.5 py-3 text-sm text-gray-700 leading-relaxed max-w-[88%]">
                  Bonjour ! Comment puis-je vous aider ?
                </div>
                <div className="space-y-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="w-full text-left text-[13px] px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors disabled:opacity-50 leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" ? (
                  <div className="flex items-end gap-2 max-w-[88%]">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mb-0.5">
                      <span className="text-[9px] font-bold text-white">C</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {msg.content || (isLoading ? <TypingDots /> : null)}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[82%] bg-blue-600 rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="chat-msg flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <span className="text-[9px] font-bold text-white">C</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-gray-100 px-3 py-3 bg-white">
            {showCharWarning && (
              <div className="flex items-center gap-1 mb-1.5 text-amber-500">
                <AlertCircle className="w-3 h-3" />
                <span className="text-[11px]">{charCount}/500</span>
              </div>
            )}
            <div className="flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-blue-400 focus-within:bg-white transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={2000}
                placeholder="Écrivez votre question…"
                disabled={isLoading}
                className="flex-1 resize-none bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none leading-6 disabled:opacity-60"
                style={{ maxHeight: "96px", lineHeight: "24px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors mb-0.5 active:scale-90"
              >
                <Send className="w-3.5 h-3.5 text-white disabled:text-gray-400" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-300 mt-1.5">
              Pas un avis juridique · Conforva
            </p>
          </div>
        </div>
      )}
    </>
  )
}
