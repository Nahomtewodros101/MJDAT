import type React from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ServiceVisualProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  bgColorClass: string // Tailwind class for background gradient
  textColorClass: string // Tailwind class for text color
  iconColorClass: string // Tailwind class for icon color
}

export function ServiceVisual({
  icon: Icon,
  title,
  description,
  bgColorClass,
  textColorClass,
  iconColorClass,
  className,
  ...props
}: ServiceVisualProps) {
  return (
    <div
      className={cn(
        "relative mx-auto p-1 rounded-xl shadow-2xl",
        "bg-gradient-to-br from-mjdat-green/30 to-mjdat-dark/50", // Consistent outer frame
        "w-[300px] h-[300px] md:w-[350px] md:h-[350px]", // Adjusted size for visual impact
        className,
      )}
      {...props}
    >
      <div className={cn("relative w-full h-full rounded-lg overflow-hidden", bgColorClass)}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {/* Background shapes for "lots of custom SVGs" feel */}
          <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
          <circle cx="10" cy="10" r="5" fill="currentColor" className={cn("opacity-20", iconColorClass)} />
          <circle cx="90" cy="90" r="7" fill="currentColor" className={cn("opacity-20", iconColorClass)} />
          <polygon
            points="50,5 95,25 95,75 50,95 5,75 5,25"
            fill="currentColor"
            className={cn("opacity-10", iconColorClass)}
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
            className={cn("opacity-15", iconColorClass)}
          />

          {/* Define gradient for background */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--start-color)" />
              <stop offset="100%" stopColor="var(--end-color)" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className={cn("absolute inset-0 flex flex-col items-center justify-center p-4 text-center", textColorClass)}
        >
          <Icon className={cn("h-16 w-16 mb-4", iconColorClass)} />
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
