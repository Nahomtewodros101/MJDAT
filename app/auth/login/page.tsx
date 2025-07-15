import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 flex items-center justify-center py-16 px-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
