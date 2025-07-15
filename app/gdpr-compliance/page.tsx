import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"

export default function GDPRCompliancePage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">GDPR Compliance</h1>

        <section className="space-y-6 text-gray-300">
          <p>
            At MJDAt Solutions, we are committed to protecting the privacy and security of our users' data. This page
            outlines our approach to compliance with the General Data Protection Regulation (GDPR), a comprehensive data
            protection law in the European Union.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">What is GDPR?</h2>
          <p>
            The GDPR is a legal framework that sets guidelines for the collection and processing of personal information
            from individuals who live in the European Union (EU). It aims to give individuals control over their
            personal data and unify data protection laws across the EU.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Our Commitment to GDPR</h2>
          <p>MJDAt Solutions is dedicated to upholding the principles of GDPR. We ensure that personal data is:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processed lawfully, fairly, and transparently.</li>
            <li>Collected for specified, explicit, and legitimate purposes.</li>
            <li>Adequate, relevant, and limited to what is necessary.</li>
            <li>Accurate and, where necessary, kept up to date.</li>
            <li>Retained only for as long as necessary.</li>
            <li>Processed in a manner that ensures appropriate security.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-mjdat-green">Your Rights Under GDPR</h2>
          <p>Under GDPR, you have several rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Right to Access:</strong> You have the right to request copies of your personal data.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to request that we correct any information you
              believe is inaccurate or complete information you believe is incomplete.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under
              certain conditions.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the
              processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Object to Processing:</strong> You have the right to object to our processing of your
              personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that
              we have collected to another organization, or directly to you, under certain conditions.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <Link href="mailto:privacy@mjdat.com" className="text-mjdat-green hover:underline">
              privacy@mjdat.com
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to ensure a level of security appropriate to
            the risk, including protection against unauthorized or unlawful processing and against accidental loss,
            destruction, or damage.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Contact Us</h2>
          <p>
            If you have any questions about our GDPR compliance or your data privacy, please do not hesitate to contact
            us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Email:{" "}
              <Link href="mailto:privacy@mjdat.com" className="text-mjdat-green hover:underline">
                privacy@mjdat.com
              </Link>
            </li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
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
