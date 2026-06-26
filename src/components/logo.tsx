export function ConforvaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 36 / 32} viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1L30 7V18C30 27.5 23.5 33.5 16 35.5C8.5 33.5 2 27.5 2 18V7L16 1Z" fill="#00E676"/>
      <path d="M10.5 18.5L14.5 22.5L21.5 13.5" stroke="#060D09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ConforvaWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ConforvaLogo size={30} />
      <span className="font-black tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>
        CONFORVA
      </span>
    </div>
  )
}
