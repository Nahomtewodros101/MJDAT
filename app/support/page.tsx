import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { HeadsetIcon, MailIcon, MessageSquareIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Support Channels</h1>

        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          We're here to help! Choose the support channel that best suits your needs. Our team is dedicated to providing
          timely and effective assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center shadow-lg">
            <HeadsetIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Phone Support</h2>
            <p className="text-gray-300 text-lg font-medium">+1 (555) 123-4567</p>
            <p className="text-gray-400 text-sm">Available 24/7</p>
          </div>
          <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center shadow-lg">
            <MailIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Email Support</h2>
            <p className="text-gray-300 text-lg font-medium">support@mjdat.com</p>
            <p className="text-gray-400 text-sm">Response within 2 hours</p>
          </div>
          <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center shadow-lg">
            <MessageSquareIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Live Chat</h2>
            <p className="text-gray-300 text-lg font-medium">Available on website</p>
            <p className="text-gray-400 text-sm">Instant response</p>
          </div>
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium flex items-center gap-2 mx-auto"
          >
            <Link href="/contact">
              Visit Support Center <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
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
