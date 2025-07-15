import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon"

export default function CookiePolicyPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Cookie Policy</h1>

        <section className="space-y-6 text-gray-300">
          <p>
            This Cookie Policy explains what Cookies are and how We use them. You should read this policy so You can
            understand what type of cookies We use, or the information We collect using Cookies and how that information
            is used. This Cookie Policy has been created with the help of the{" "}
            <Link
              href="https://www.termsfeed.com/blog/cookie-policy-generator/"
              className="text-mjdat-green hover:underline"
            >
              Cookie Policy Generator
            </Link>
            .
          </p>

          <p>
            Cookies do not typically contain any information that personally identifies a user, but personal information
            that we store about You may be linked to the information stored in and obtained from Cookies. For further
            information on how We use, store and keep your personal data secure, see our Privacy Policy.
          </p>

          <p>
            We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the
            Cookies We use.
          </p>

          <h2 className="text-2xl font-semibold text-mjdat-green">Interpretation and Definitions</h2>
          <h3 className="text-xl font-semibold">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.
            The following definitions shall have the same meaning regardless of whether they appear in singular or in
            plural.
          </p>

          <h3 className="text-xl font-semibold">Definitions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy)
              refers to MJDAt Solutions.
            </li>
            <li>
              <strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other
              device by a website, containing your browsing history on that website among its many uses.
            </li>
            <li>
              <strong>Website</strong> refers to MJDAt Solutions, accessible from{" "}
              <Link href="https://www.mjdat.com" className="text-mjdat-green hover:underline">
                www.mjdat.com
              </Link>
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Website, or a company, or any legal
              entity on behalf of which such individual is accessing or using the Website, as applicable.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-mjdat-green">The use of the Cookies</h2>
          <h3 className="text-xl font-semibold">Type of Cookies We Use</h3>
          <p>
            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or
            mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
          </p>
          <p>We use both session and persistent Cookies for the purposes set out below:</p>

          <h4 className="text-lg font-medium">Necessary / Essential Cookies</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Type: Session Cookies</li>
            <li>Administered by: Us</li>
            <li>
              Purpose: These Cookies are essential to provide You with services available through the Website and to
              enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user
              accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use
              these Cookies to provide You with those services.
            </li>
          </ul>

          <h4 className="text-lg font-medium">Functionality Cookies</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Type: Persistent Cookies</li>
            <li>Administered by: Us</li>
            <li>
              Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering
              your login details or language preference. The purpose of these Cookies is to provide You with a more
              personal experience and to avoid You having to re-enter your preferences every time You use the Website.
            </li>
          </ul>

          {/* Add more sections as needed */}
        </section>
      </main>
      <Footer />
    </div>
  )
}
