"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"
import { Calendar, MapPin, Users } from "lucide-react"

export default function UpcomingEvents() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const eventDate = new Date("2026-01-17").getTime()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  const timeline = [
    {
      date: "14 October 2025",
      event: "Conference Officially Announced",
      description: "The conference is officially announced",
    },
    {
      date: "28 October 2025",
      event: "Secretariat Applications Out",
      description: "Applications for secretariat positions open",
    },
    { date: "6 November 2025", event: "Delegate Applications Out", description: "Delegate applications now open" },
    { date: "6 November 2025", event: "Early Bird Registration Start", description: "Early bird registration begins" },
    {
      date: "7 November 2025",
      event: "Committees and Agenda Out",
      description: "Committee details and agenda released",
    },
    {
      date: "20 November 2025",
      event: "Early Bird Registration Ends",
      description: "Early bird registration deadline",
    },
    { date: "16 January 2026", event: "Registration Closes", description: "Final registration deadline" },
    { date: "17-18 January 2026", event: "Dates of Conference", description: "Main conference event" },
  ]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Uthan Youth Parliament 2026</h1>
              <p className="text-xl opacity-90">Season 7: Varchasva</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">Event Countdown</h2>
          </ScrollReveal>

          <div className="bg-gradient-to-r from-primary via-primary/80 to-secondary rounded-2xl p-8 md:p-16 text-primary-foreground text-center mb-8 shadow-lg">
            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 md:p-6">
                    <div className="text-3xl md:text-5xl font-bold mb-2 font-mono">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs md:text-sm opacity-80 uppercase tracking-wider">{item.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <Link
              href="/join"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">Event Highlights</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Users,
                title: "10,000+ Participants",
                description: "Youth leaders from across India",
              },
              {
                icon: MapPin,
                title: "Multi-City Format",
                description: "Simultaneous events in major cities",
              },
              {
                icon: Calendar,
                title: "Full Day Program",
                description: "Workshops, debates, and networking",
              },
            ].map((highlight, i) => {
              const IconComponent = highlight.icon
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all border border-border hover:border-primary/50">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <IconComponent className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Timeline */}
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-center mb-8">Important Dates</h3>
          </ScrollReveal>

          <div className="space-y-4">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-6 flex gap-6 border-l-4 border-accent hover:shadow-md transition-all">
                  <div className="text-accent font-bold text-lg whitespace-nowrap min-w-max">{item.date}</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.event}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-bold mb-6">Don't Miss Out!</h2>
              <p className="text-xl opacity-90 mb-8">Secure your spot now and be part of this historic event</p>
              <Link
                href="/join"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Join Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
