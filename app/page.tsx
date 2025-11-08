"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight, BookOpen, Users, Lightbulb, Globe } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import ScrollReveal from "@/components/scroll-reveal"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: "Engaging Discussion",
      description:
        "We facilitate rigorous, substantive debates designed to deeply forge profound critical thinking skills, ensuring participants move beyond surface-level understanding.",
    },
    {
      icon: Users,
      title: "Powerful Networking",
      description:
        "This involves actively forging strategic professional alliances while simultaneously cultivating a robust, supportive network of accomplished peers for mutual growth.",
    },
    {
      icon: Lightbulb,
      title: "Idea Incubation",
      description:
        "This platform acts as the dedicated nexus where members converge to cultivate breakthrough concepts and develop truly innovative and effective remedies.",
    },
    {
      icon: Globe,
      title: "Global Outlook",
      description:
        "We focus on nurturing an expansive intellectual engagement, ensuring that all perspectives and analyses are informed by worldwide contexts and broad awareness.",
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-background to-background relative overflow-hidden pt-16 text-background">
        {/* Animated background circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 leading-tight text-balance" style={{ color: "#070091" }}>
              UNNATI
            </h1>
            <div className="mb-8">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: "#070091" }}>
                A Knowledge Hub For Civil Aspirants
              </p>
              <p className="text-xl md:text-2xl font-semibold mt-2" style={{ color: "#070091" }}>
                <br />
              </p>
            </div>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join India's premier organization fostering dialogue, critical thinking, and national pride among young
              leaders.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/join"
                className="text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 bg-accent"
              >
                Register Now
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#070091" }}>
              Our Impact
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Participants", end: 10000 },
              { label: "Editions", end: 7 },
              { label: "Events", end: 50 },
              { label: "States", end: 25 },
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center p-6 rounded-lg bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">
                    <AnimatedCounter end={stat.end} duration={2} />
                    {stat.end >= 1000 && "+"}
                  </div>
                  <p className="text-muted-foreground font-semibold">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#070091" }}>
              Voices of Change
            </h2>
          </ScrollReveal>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Unnati - Knowledge Hub Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#070091" }}>
              Why Join Unnati?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="p-6 bg-gradient-to-br from-background to-muted rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                    <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: "#070091" }}>
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of young leaders shaping India's future</p>
              <Link
                href="/join"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Join Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
