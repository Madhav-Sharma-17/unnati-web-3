"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Student Leader",
    content: "UYP transformed my perspective on parliamentary processes and helped me find my voice as a youth leader.",
    image: "/diverse-student-portraits.png",
  },
  {
    name: "Priya Patel",
    role: "Social Activist",
    content:
      "The platform provided by Uthan Youth Parliament is invaluable for young changemakers to make meaningful impact.",
    image: "/activist-portrait.jpg",
  },
  {
    name: "Rahul Kumar",
    role: "Entrepreneur",
    content: "Meeting diverse minds through UYP broadened my understanding of social responsibility and leadership.",
    image: "/entrepreneur-portrait.png",
  },
  {
    name: "Neha Singh",
    role: "Journalist",
    content: "Covering UYP events revealed the genuine passion young Indians have for nation building and dialogue.",
    image: "/journalist-portrait.png",
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
        <div className="flex items-center gap-6">
          <img
            src={testimonials[current].image || "/placeholder.svg"}
            alt={testimonials[current].name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-lg italic text-foreground mb-4">"{testimonials[current].content}"</p>
            <p className="font-semibold text-primary">{testimonials[current].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={prev}
          className="p-2 hover:bg-primary/10 rounded-full transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>
        <div className="flex gap-2 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                setIsAutoPlay(false)
              }}
              className={`h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted w-2"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 hover:bg-primary/10 rounded-full transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      </div>
    </div>
  )
}
