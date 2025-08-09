"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductCarouselItem {
  src: string
  alt: string
  title: string
}

interface ProductCarouselProps {
  items: ProductCarouselItem[]
  className?: string
  autoplayDelay?: number
}

const ProductCarousel = React.forwardRef<
  HTMLDivElement,
  ProductCarouselProps
>(({ items, className, autoplayDelay = 2500, ...props }, ref) => {
  const plugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  )

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex flex-col items-center justify-center p-6">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-auto w-full rounded-lg object-contain"
                  />
                  {item.title && (
                    <h3 className="mt-4 text-center text-lg font-semibold">
                      {item.title}
                    </h3>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
})
ProductCarousel.displayName = "ProductCarousel"

export { ProductCarousel, type ProductCarouselItem }