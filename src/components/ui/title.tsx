// components/ui/title.tsx
import React from "react"
import { cn } from "../../lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string
}

export function Title({ text, className, ...props }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white",
        className
      )}
      {...props}
    >
      {text}
    </h1>
  )
}
