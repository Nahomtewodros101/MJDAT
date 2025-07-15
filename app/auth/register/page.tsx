import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 flex items-center justify-center py-16 px-4">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}
