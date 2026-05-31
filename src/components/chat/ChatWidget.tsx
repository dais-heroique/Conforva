"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Sparkles, AlertCircle } from "lucide-react"

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
    <div className="flex items-center gap-1 px-4 py-3">
      <span
        className="w-2 h-2 rounded-full bg-blue-400"
        style={{ animation: "typing-dot 1.2s ease-in-out infinite", animationDelay: "0ms" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-blue-400"
        style={{ animation: "typing-dot 1.2s ease-in-out infinite", animationDelay: "200ms" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-violet-400"
        style={{ animation: "typing-dot 1.2s ease-in-out infinite", animationDelay: "400ms" }}
      />
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
  const panelRef = useRef<HTMLDivElement>(null)

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Message[]
        if (Array.isArray(parsed)) {
          setMessages(parsed.slice(-MAX_STORED_MESSAGES))
        }
      }
    } catch {
      // ignore parse errors
    }
    setHasLoaded(true)
  }, [])

  // Persist to localStorage on every message change (after initial load)
  useEffect(() => {
    if (!hasLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)))
    } catch {
      // ignore storage errors
    }
  }, [messages, hasLoaded])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    const lineHeight = 24
    const maxHeight = lineHeight * 4
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + "px"
  }, [input])

  // Focus textarea when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 120)
    }
  }, [isOpen])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      }
      const aiMsgId = crypto.randomUUID()
      const aiMsg: Message = { id: aiMsgId, role: "assistant", content: "" }

      setMessages((prev) => [...prev, userMsg, aiMsg])
      setInput("")
      setIsLoading(true)

      try {
        const history = [...messages, userMsg].slice(-20).map(({ role, content }) => ({
          role,
          content,
        }))

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            productContext: productContext || undefined,
          }),
        })

        if (!res.ok || !res.body) {
          const errText = res.status === 503
            ? "Le service IA n'est pas configuré."
            : res.status === 401
            ? "Session expirée. Veuillez vous reconnecter."
            : "Une erreur est survenue. Réessayez dans quelques instants."
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: errText } : m
            )
          )
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: m.content + chunk } : m
            )
          )
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, content: "Erreur de connexion. Vérifiez votre réseau et réessayez." }
              : m
          )
        )
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
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  const charCount = input.length
  const showCharWarning = charCount >= CHAR_WARNING_THRESHOLD

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chat-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.45); opacity: 0; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes message-appear {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-panel {
          animation: chat-slide-up 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .chat-message {
          animation: message-appear 0.2s ease-out forwards;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          animation: chat-pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative pulse-ring">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le chat IA de conformité"
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le chat"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            }}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="chat-panel fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{
            background: "#fff",
            boxShadow: "0 24px 64px rgba(37,99,235,0.18), 0 4px 16px rgba(0,0,0,0.10)",
            maxHeight: "calc(100vh - 7rem)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
            }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Conforva AI</p>
              <p className="text-blue-200 text-xs leading-tight truncate">Expert conformité GPSR · CE · CPSC · UKCA</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  title="Effacer l'historique"
                  className="text-white/60 hover:text-white/90 text-xs px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Effacer
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Online indicator strip */}
          <div className="h-0.5 flex-shrink-0" style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8, #a78bfa)" }} />

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ minHeight: 0 }}>
            {/* Empty state with suggestions */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)" }}
                  >
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-700 font-medium text-sm">Bonjour ! Comment puis-je vous aider ?</p>
                  <p className="text-gray-400 text-xs mt-0.5">Posez votre question sur la conformité</p>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-sm px-3.5 py-2.5 rounded-xl border border-blue-100 bg-blue-50/60 text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-end gap-2 max-w-[88%]">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5"
                      style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div
                      className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm text-gray-800 leading-relaxed whitespace-pre-wrap"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                      }}
                    >
                      {msg.content || (isLoading && <TypingDots />)}
                    </div>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="max-w-[82%]">
                    <div
                      className="px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm text-white leading-relaxed whitespace-pre-wrap"
                      style={{
                        background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator shown between last user message and AI response */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="chat-message flex justify-start">
                <div className="flex items-end gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm"
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="flex-shrink-0 border-t border-gray-100 px-3 py-3"
            style={{ background: "#fafafa" }}
          >
            {/* Character warning */}
            {showCharWarning && (
              <div className="flex items-center gap-1.5 mb-2 text-amber-600">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs">{charCount}/500 caractères</span>
              </div>
            )}

            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              onFocus={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "#6366f1"
                el.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"
              }}
              onBlur={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "#e2e8f0"
                el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={2000}
                placeholder="Posez votre question…"
                disabled={isLoading}
                className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none leading-6 disabled:opacity-60"
                style={{ maxHeight: "96px", lineHeight: "24px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                aria-label="Envoyer"
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed mb-0.5"
                style={{
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
                    : "#e5e7eb",
                }}
              >
                <Send
                  className="w-4 h-4"
                  style={{ color: input.trim() && !isLoading ? "#fff" : "#9ca3af" }}
                />
              </button>
            </div>

            {/* Footer disclaimer */}
            <p className="text-center text-gray-400 text-[10px] mt-2 leading-tight">
              IA de conformité · Pas un avis juridique
            </p>
          </div>
        </div>
      )}
    </>
  )
}
