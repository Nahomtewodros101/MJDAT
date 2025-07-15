"use client"
import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl text-gray-300 mb-8">Something went wrong.</p>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <Button
          onClick={() => reset()}
          className="bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3"
        >
          Try again
        </Button>
      </main>
      <Footer />
    </div>
  )
}
