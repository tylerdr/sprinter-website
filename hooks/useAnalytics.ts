import { analytics } from '@/lib/analytics/tracker'

export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    pageView: analytics.pageView.bind(analytics),
    linkClick: analytics.linkClick.bind(analytics),
    buttonClick: analytics.buttonClick.bind(analytics),
    formSubmit: analytics.formSubmit.bind(analytics),
    conversion: analytics.conversion.bind(analytics),
    custom: analytics.custom.bind(analytics),
    identify: analytics.identify.bind(analytics),
    reset: analytics.reset.bind(analytics)
  }
}