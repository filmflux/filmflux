import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  variant?: "default" | "hexLeft"
}

function Input({
  className,
  type,
  variant = "default",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base styles
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "dark:bg-input/30 border-input h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs",
        "transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // variant logic
        variant === "default" && "rounded-md",

        variant === "hexLeft" && [
          "relative",
            "bg-[#0fab48] text-white",
            "rounded-none",
            "[clip-path:polygon(10%_0%,_100%_0%,_95%_50%,_100%_100%,_10%_100%,_0%_50%)]",
            "px-6 py-2",
            "placeholder:text-white/70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",      
            ],

        className
      )}
      {...props}
    />
  )
}

export { Input }
