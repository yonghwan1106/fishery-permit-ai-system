import * as React from "react"
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  text?: string
  variant?: "spinner" | "dots" | "wave" | "pulse"
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = "md", text, variant = "spinner", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8", 
      lg: "w-12 h-12"
    }
    
    const textSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }

    const renderSpinner = () => (
      <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-ocean-500", sizeClasses[size])} />
    )

    const renderDots = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("rounded-full bg-ocean-500", size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3")}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    )

    const renderWave = () => (
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-ocean-500", size === "sm" ? "w-1" : size === "md" ? "w-1.5" : "w-2")}
            animate={{
              height: [size === "sm" ? 8 : size === "md" ? 16 : 24, size === "sm" ? 16 : size === "md" ? 32 : 48, size === "sm" ? 8 : size === "md" ? 16 : 24]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    )

    const renderPulse = () => (
      <motion.div
        className={cn("rounded-full bg-ocean-500", sizeClasses[size])}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    )

    const renderVariant = () => {
      switch (variant) {
        case "dots":
          return renderDots()
        case "wave":
          return renderWave()
        case "pulse":
          return renderPulse()
        default:
          return renderSpinner()
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center space-y-3", className)}
        {...props}
      >
        {renderVariant()}
        {text && (
          <p className={cn("text-gray-600 animate-pulse", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    )
  }
)
Loading.displayName = "Loading"

export { Loading }