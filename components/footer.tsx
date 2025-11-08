"use client"

import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, MapPin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Organization */}
          <div>
            <h3 className="font-bold text-lg mb-4">Unnati</h3>
            <p className="text-sm opacity-90">Empowering Youth Through Dialogue and Leadership</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:opacity-80 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:opacity-80 transition">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:opacity-80 transition">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>upsc.cell.du@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 9999383330</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/unnaticell"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/uthan_youth_parliament?igsh=MWxxMTJwNDdlMnk3bg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/the-uthan-youth-parliament/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>© 2025 Unnati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
