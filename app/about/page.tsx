"use client"

import { useState } from "react"
import ScrollReveal from "@/components/scroll-reveal"
import { MapPin, Users, Zap, Facebook } from "lucide-react"
import { useEffect } from "react"

const teamMembers = [
  {
    name: "Mr. Oscar Fernandes",
    role: "Chief Patron (MP, Rajya Sabha)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mr.%20Oscar%20fernandes-qA4YmudEayjZHZX7FDCIXOJX3Nx5z1.jpg",
    isMember: false,
    facebookUrl: "",
  },
  {
    name: "Mr. P. L. Punia",
    role: "Chief Patron (MP, Rajya Sabha)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mr%20p%20l%20punia-hFnfyWkPtJPBRNKlJrMNFMD3w4vLEX.jpg",
    isMember: false,
    facebookUrl: "",
  },
  {
    name: "Mr. Lokesh Chugh",
    role: "Founder and Chairman",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mr%20lokesh%20chugh-QhgFrteNhdoEcg09WpgmMA9qhuTPvX.jpg",
    isMember: true,
    facebookUrl: "",
  },
  {
    name: "Ms. Jyoti Gupta",
    role: "President",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ms%20jyoti%20gupta-JWqniUUxh5xJ3DtiX6Tjpbbyzf6ULF.jpg",
    isMember: true,
    facebookUrl: "",
  },
]

const values = [
  { icon: Zap, title: "Excellence", description: "Pursuing highest standards in all endeavors" },
  { icon: Users, title: "Inclusion", description: "Embracing diverse voices and perspectives" },
  { icon: MapPin, title: "Nation Building", description: "Contributing to India's progress" },
]

export default function About() {
  const [activeYear, setActiveYear] = useState(0)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [milestones, setMilestones] = useState([])

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch("/api/milestones")
        const data = await response.json()
        setMilestones(data)
      } catch (error) {
        console.error("Failed to fetch milestones:", error)
      }
    }

    fetchMilestones()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">About Unnati</h1>
              <p className="text-xl opacity-90">Building India's Future Through Youth Leadership</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower young Indians with the knowledge, skills, and platform to engage in meaningful dialogue on
                  national issues, fostering critical thinking and informed citizenship.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A generation of empowered youth leaders who understand democratic processes, value parliamentary
                  traditions, and actively contribute to nation-building with integrity and wisdom.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-all text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <Icon className="text-accent" size={28} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
          </ScrollReveal>

          {/* Timeline visualization */}
          <div className="relative mb-12">
            {/* Vertical line */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" />

            <div className="space-y-8">
              {milestones.length > 0 ? (
                milestones.map((item, index) => (
                  <ScrollReveal key={index} delay={index * 0.05}>
                    <div className="flex gap-6 group cursor-pointer" onClick={() => setActiveYear(index)}>
                      {/* Timeline dot */}
                      <div className="relative z-10 w-24 h-24 flex-shrink-0">
                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-300 ${
                            activeYear === index
                              ? "bg-primary scale-100 ring-4 ring-primary/30"
                              : "bg-white border-4 border-primary scale-75 group-hover:scale-90"
                          }`}
                        />
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className={`font-bold transition-colors ${activeYear === index ? "text-white" : "text-primary"}`}
                          >
                            {item.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 p-6 rounded-lg transition-all duration-300 ${
                          activeYear === index
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "bg-white text-foreground group-hover:shadow-md"
                        }`}
                      >
                        <p className={`text-sm font-semibold mb-2 opacity-75`}>{item.milestone}</p>
                        <p className="text-lg font-semibold">{item.event}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              ) : (
                <div className="text-center text-muted-foreground">No milestones added yet</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">Our Leadership</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all group cursor-pointer"
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="relative overflow-hidden h-56 bg-primary/10">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {!member.isMember && member.facebookUrl && (
                      <a
                        href={member.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                        title="Facebook Profile"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg text-primary mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
