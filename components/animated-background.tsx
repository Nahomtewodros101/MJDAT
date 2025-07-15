"use client"

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large Hexagon 1 */}
      <svg className="absolute top-1/4 left-1/4 w-48 h-48 text-mjdat-green/10 animate-float" viewBox="0 0 100 100">
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      {/* Large Hexagon 2 */}
      <svg
        className="absolute bottom-1/4 right-1/4 w-64 h-64 text-mjdat-green/10 animate-float animation-delay-2s"
        viewBox="0 0 100 100"
      >
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      {/* Small Circle 1 */}
      <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-mjdat-green/10 animate-pulse-slow" />
      {/* Small Circle 2 */}
      <div className="absolute bottom-1/5 left-1/5 w-12 h-12 rounded-full bg-mjdat-green/10 animate-pulse-slow animation-delay-1s" />
      {/* Line 1 */}
      <div className="absolute top-1/2 left-1/2 w-px h-24 bg-mjdat-green/10 rotate-45 animate-rotate-slow" />
      {/* Line 2 */}
      <div className="absolute top-1/4 right-1/5 w-px h-32 bg-mjdat-green/10 -rotate-45 animate-rotate-slow animation-delay-3s" />
      {/* Dot Grid (conceptual, for subtle texture) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--mjdat-green)_1px,transparent_1px)] [background-size:20px_20px] opacity-5" />
    </div>
  )
}
