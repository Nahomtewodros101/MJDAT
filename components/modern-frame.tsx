import type React from "react"
import { cn } from "@/lib/utils"

interface ModernFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ModernFrame({ children, className, ...props }: ModernFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto p-1 rounded-xl shadow-2xl",
        "bg-gradient-to-br from-mjdat-green/30 to-mjdat-dark/50", // Subtle gradient border effect
        "w-[300px] h-[600px] md:w-[375px] md:h-[750px]", // Consistent sizing
        className,
      )}
      {...props}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-mjdat-dark border border-mjdat-green/20">
        {children}
      </div>
    </div>
  )
}
