import type React from "react"
import { cn } from "@/lib/utils"

interface iPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  color?: "black" | "white"
}

export default function iPhoneFrame({ children, color = "black", className, ...props }: iPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto border-[8px] rounded-[2.5rem] shadow-xl",
        "w-[300px] h-[600px] md:w-[375px] md:h-[750px]", // Standard iPhone sizes
        color === "black" ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-100",
        className,
      )}
      {...props}
    >
      {/* Notch */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem]",
          "w-[100px] h-[20px] md:w-[120px] md:h-[25px]",
          color === "black" ? "bg-gray-800" : "bg-gray-200",
        )}
      />
      {/* Speaker */}
      <div
        className={cn(
          "absolute top-2 left-1/2 -translate-x-1/2 rounded-full",
          "w-8 h-1 md:w-10 md:h-1.5",
          color === "black" ? "bg-gray-600" : "bg-gray-400",
        )}
      />
      {/* Dynamic Island (simplified) */}
      <div
        className={cn(
          "absolute top-4 left-1/2 -translate-x-1/2 rounded-full",
          "w-16 h-6 md:w-20 md:h-8",
          color === "black" ? "bg-black" : "bg-white",
          "flex items-center justify-center text-xs text-white/80",
        )}
      >
        {/* You can add content here for dynamic island effects */}
      </div>
      {/* Screen */}
      <div
        className={cn(
          "absolute inset-[10px] rounded-[2rem] overflow-hidden",
          "bg-white dark:bg-black", // Screen background
        )}
      >
        {children}
      </div>
      {/* Home button (for older iPhones, or just a design element) */}
      {/* <div className={cn("absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2", color === "black" ? "border-gray-600" : "border-gray-400")} /> */}
    </div>
  )
}
