"use client"
import { Copy } from "lucide-react"
import { useState } from "react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors shrink-0"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? "Copié !" : "Copier"}
    </button>
  )
}
