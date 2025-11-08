"use client"

import type React from "react"
import { useState } from "react"
import ScrollReveal from "@/components/scroll-reveal"
import { Check, Users, Mail, ExternalLink } from "lucide-react"

export default function Join() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    school: "",
    interest: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const googleFormLink = "" // User will provide this link

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", state: "", school: "", interest: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Join the Movement</h1>
              <p className="text-xl opacity-90">Become part of India's leading youth parliament</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold mb-8 text-secondary">Why Join UYP?</h2>
                <div className="space-y-4">
                  {[
                    "Engage with democratic processes directly",
                    "Network with youth leaders nationwide",
                    "Develop public speaking and debate skills",
                    "Contribute to nation-building initiatives",
                    "Access exclusive workshops and trainings",
                    "Build lasting friendships and connections",
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                      </div>
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-muted to-background p-8 rounded-xl border border-border flex flex-col items-center justify-center text-center min-h-96">
                <h3 className="text-2xl font-bold mb-6">Ready to Register?</h3>
                <p className="text-muted-foreground mb-8">Click the button below to fill out your registration form</p>

                {googleFormLink ? (
                  <a
                    href={googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 mb-4"
                  >
                    Register Now
                    <ExternalLink size={20} />
                  </a>
                ) : (
                  <div className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2">
                    Register Now
                    <ExternalLink size={20} />
                  </div>
                )}

                <p className="text-sm text-muted-foreground mt-4">Google Form link will be added soon</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="bg-white p-8 rounded-xl text-center border border-border hover:shadow-md transition-all">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="font-semibold text-foreground mb-2">Email</p>
                <p className="text-muted-foreground text-sm break-all">upsc.cell.du@gmail.com</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 rounded-xl text-center border border-border hover:shadow-md transition-all">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="font-semibold text-foreground mb-2">Follow Us</p>
                <p className="text-muted-foreground text-sm">@uthan_youth_parliament</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 rounded-xl text-center border border-border hover:shadow-md transition-all">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Check className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="font-semibold text-foreground mb-2">Status</p>
                <p className="text-muted-foreground text-sm">Registrations Open</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
