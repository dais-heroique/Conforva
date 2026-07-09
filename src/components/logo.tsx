export function ConforvaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8,50 C 22,20 78,20 92,50 C 78,80 22,80 8,50 Z" stroke="#8B5CF6" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="50" r="16" stroke="#8B5CF6" strokeWidth="5" fill="none"/>
      <path d="M 50,34 A 16,16 0 0 1 66,50 A 12,12 0 0 1 50,62 A 9,9 0 0 1 41,50 A 6,6 0 0 1 50,44" stroke="#8B5CF6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="57" cy="42" r="3.5" fill="#8B5CF6"/>
    </svg>
  )
}

export function ConforvaWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ConforvaLogo size={28} />
      <span className="font-black tracking-tight text-white" style={{ letterSpacing: "-0.02em", fontSize: "1.1rem" }}>CONFORVA</span>
    </div>
  )
}
