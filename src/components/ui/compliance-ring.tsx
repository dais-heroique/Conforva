"use client"

import { useEffect, useState } from "react"

interface ComplianceRingProps {
  score: number
  size?: number
  strokeWidth?: number
}

export function ComplianceRing({ score, size = 120, strokeWidth = 10 }: ComplianceRingProps) {
  const [animated, setAnimated] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference

  const color = score >= 80 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626"
  const bgColor = score >= 80 ? "#dcfce7" : score >= 50 ? "#fef3c7" : "#fee2e2"
  const label = score >= 80 ? "Conforme" : score >= 50 ? "En cours" : "Incomplet"

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{score}%</span>
          <span className="text-xs text-gray-500 mt-0.5">{label}</span>
        </div>
      </div>
    </div>
  )
}
