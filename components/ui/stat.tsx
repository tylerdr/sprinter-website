import * as React from "react"
import { cn } from "@/lib/utils"

interface StatProps {
  label: string
  value: string | number
  note?: string
  className?: string
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ label, value, note, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-xl ring-1 ring-border p-4 bg-card", className)}
        {...props}
      >
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="text-3xl font-semibold tabular-nums leading-none">
          {value}
        </dd>
        {note && (
          <div className="mt-2 text-xs text-muted-foreground">{note}</div>
        )}
      </div>
    )
  }
)
Stat.displayName = "Stat"

export { Stat }