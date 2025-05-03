import { Suspense } from "react"
import LandingPageClient from "@/components/landing-page-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function LandingPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LandingPageClient />
    </Suspense>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full md:hidden" />
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="container px-4 md:px-6 py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-12 w-full max-w-sm" />
            <Skeleton className="h-6 w-full max-w-lg" />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-[350px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
