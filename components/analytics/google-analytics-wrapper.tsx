import { Suspense } from "react"
import { GoogleAnalytics } from "./google-analytics"

export function GoogleAnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
    </Suspense>
  )
}