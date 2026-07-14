interface Props {
  points: number[]
  width?: number
  height?: number
}

// Lightweight server-rendered inline sparkline — no chart library, no client JS.
export function PriceSparkline({ points, width = 72, height = 24 }: Props) {
  if (points.length < 2) {
    return <span className="text-xs text-gray-700">—</span>
  }

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)

  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = height - ((p - min) / range) * (height - 4) - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const trendUp = points[points.length - 1] > points[0]
  const trendDown = points[points.length - 1] < points[0]
  const color = trendDown ? "#34d399" : trendUp ? "#f87171" : "#6b7280"

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block overflow-visible">
      <polyline points={coords.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={coords[coords.length - 1].split(",")[0]} cy={coords[coords.length - 1].split(",")[1]} r="2" fill={color} />
    </svg>
  )
}
