"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface InteractiveServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function InteractiveServiceCard({ icon: Icon, title, description, href }: InteractiveServiceCardProps) {
  return (
    <Link href={href} passHref>
      <motion.div
        className={cn(
          "relative flex flex-col items-center justify-center p-6 rounded-lg shadow-lg cursor-pointer",
          "bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light",
          "overflow-hidden group", // Add group for hover effects on children
        )}
        whileHover={{ scale: 1.03, borderColor: "var(--mjdat-light-green)" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Animated background SVG element */}
        <motion.svg
          className="absolute inset-0 w-full h-full text-mjdat-green/10"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 0.2, scale: 1.2, rotate: 15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </motion.svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <Icon className="h-12 w-12 text-mjdat-green mb-4" />
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </motion.div>
    </Link>
  )
}
