"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { MailIcon, PhoneIcon } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          serviceInterest: "",
          subject: "",
          message: "",
        })
      } else {
        setStatus("error")
      }
      alert(data.message || data.error)
    } catch (error) {
      console.error("Contact form submission error:", error)
      setStatus("error")
      alert("Failed to submit message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Contact Us</h1>

        <section className="mb-16">
          <p className="text-lg text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with our team of experts and discover how MJDAt Solutions can
            help you achieve your goals.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-mjdat-green">&lt; 2 hours</h3>
              <p className="text-gray-300">Response Time</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-mjdat-green">24/7</h3>
              <p className="text-gray-300">Support Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-mjdat-green">4</h3>
              <p className="text-gray-300">Global Offices</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-mjdat-green">98%</h3>
              <p className="text-gray-300">Client Satisfaction</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-8 shadow-lg">
          <div>
            <h2 className="text-3xl font-semibold text-mjdat-green mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
                />
                <Input
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
                />
              </div>
              <Input
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
              />
              <Select
                onValueChange={(value) => handleSelectChange("serviceInterest", value)}
                value={formData.serviceInterest}
              >
                <SelectTrigger className="w-full bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-mjdat-dark text-mjdat-text-light border-mjdat-green/30">
                  <SelectItem value="logistics-support">Logistics Support</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="data-entry">Data Entry</SelectItem>
                  <SelectItem value="it-support">IT Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
              />
              <Textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
              />
              <Button
                type="submit"
                className="w-full bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {status === "success" && <p className="text-mjdat-green mt-2">Message sent successfully!</p>}
              {status === "error" && <p className="text-red-500 mt-2">Failed to send message. Please try again.</p>}
            </form>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-mjdat-green mb-6">Let's Start a Conversation</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <PhoneIcon className="h-6 w-6 text-mjdat-green shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency Support Available</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MailIcon className="h-6 w-6 text-mjdat-green shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-gray-300">info@mjdat.com</p>
                  <p className="text-gray-400 text-sm">Response within 2-4 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
