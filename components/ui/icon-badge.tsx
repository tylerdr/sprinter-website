import * as React from "react"
import { cn } from "@/lib/utils"

interface IconBadgeProps {
  icon: React.ReactNode
  title: string
  body?: string
  className?: string
}

const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  ({ icon, title, body, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start gap-3", className)}
        {...props}
      >
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-border">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          {body && (
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          )}
        </div>
      </div>
    )
  }
)
IconBadge.displayName = "IconBadge"

export { IconBadge }