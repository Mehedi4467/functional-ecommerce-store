"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "60% OFF",
      subtitle: "Limited Time Offer",
      description: "Shop Now and Save Big",
      bgGradient: "from-[#ff872d] via-[#ff9d4d] to-[#ffb366]",
    },
    {
      id: 2,
      title: "50% OFF",
      subtitle: "Flash Sale",
      description: "Exclusive Deals Today",
      bgGradient: "from-[#ff872d] via-[#ff8c3a] to-[#ff9d4d]",
    },
    {
      id: 3,
      title: "40% OFF",
      subtitle: "Weekend Special",
      description: "Don't Miss Out",
      bgGradient: "from-[#ffb366] via-[#ff872d] to-[#ff9d4d]",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-8">
        <div className="text-center text-white z-10">
          <div className="text-sm md:text-base font-semibold mb-2 opacity-90">{slide.subtitle}</div>
          <div className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{slide.title}</div>
          <div className="text-lg md:text-2xl font-semibold opacity-95">{slide.description}</div>
        </div>

        {/* Orange accent element */}
        <div className="absolute top-4 right-8 w-16 h-16 bg-orange-400 rounded-full opacity-20" />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${index === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
