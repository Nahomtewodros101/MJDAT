import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon"

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Terms of Service</h1>

        <section className="space-y-6 text-gray-300">
          <p>
            Welcome to MJDAt Solutions! These terms and conditions outline the rules and regulations for the use of
            MJDAt Solutions' Website, located at www.mjdat.com.
          </p>

          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use MJDAt
            Solutions if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing MJDAt Solutions, you agreed to use cookies in agreement with the
            MJDAt Solutions' Privacy Policy.
          </p>
          <p>
            Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used
            by our website to enable the functionality of certain areas to make it easier for people visiting our
            website. Some of our affiliate/advertising partners may also use cookies.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">License</h2>
          <p>
            Unless otherwise stated, MJDAt Solutions and/or its licensors own the intellectual property rights for all
            material on MJDAt Solutions. All intellectual property rights are reserved. You may access this from MJDAt
            Solutions for your own personal use subject to restrictions set in these terms and conditions.
          </p>

          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from MJDAt Solutions</li>
            <li>Sell, rent or sub-license material from MJDAt Solutions</li>
            <li>Reproduce, duplicate or copy material from MJDAt Solutions</li>
            <li>Redistribute content from MJDAt Solutions</li>
          </ul>

          <p>This Agreement shall begin on the date hereof.</p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Hyperlinking to our Content</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites
              of other listed businesses; and
            </li>
            <li>
              System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
              charity fundraising groups which may not hyperlink to our Web site.
            </li>
          </ul>
          <p>
            These organizations may link to our home page, to publications or to other Website information so long as
            the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval
            of the linking party and its products and/or services; and (c) fits within the context of the linking
            party’s site.
          </p>

          {/* Add more sections as needed */}
        </section>
      </main>
      <Footer />
    </div>
  )
}
