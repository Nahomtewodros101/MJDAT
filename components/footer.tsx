import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-mjdat-dark text-mjdat-text-light py-8 px-4 border-t border-mjdat-green/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-mjdat-green">MJDAt™</h3>
          <p className="text-sm text-gray-400">
            Transforming businesses through comprehensive outsourcing solutions and innovative BPO services.
          </p>
          <Link href="https://www.mjdat.com" className="text-mjdat-green text-sm hover:underline">
            www.MJDAtSolutions.com
          </Link>
        </div>
        <div className="space-y-2">
          <h4 className="text-md font-semibold">Services</h4>
          <nav className="flex flex-col space-y-1 text-sm">
            <Link href="/services" className="hover:text-mjdat-green transition-colors">
              All Services
            </Link>
            <Link href="/services#human-resources" className="hover:text-mjdat-green transition-colors">
              Human Resources
            </Link>
            <Link href="/services#financial-services" className="hover:text-mjdat-green transition-colors">
              Financial Services
            </Link>
            <Link href="/services#digital-marketing" className="hover:text-mjdat-green transition-colors">
              Digital Marketing
            </Link>
            <Link href="/services#it-support" className="hover:text-mjdat-green transition-colors">
              IT Support
            </Link>
            <Link href="/services#process-automation" className="hover:text-mjdat-green transition-colors">
              Process Automation
            </Link>
            <Link href="/services#business-consulting" className="hover:text-mjdat-green transition-colors">
              Business Consulting
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h4 className="text-md font-semibold">Company</h4>
          <nav className="flex flex-col space-y-1 text-sm">
            <Link href="/about" className="hover:text-mjdat-green transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="hover:text-mjdat-green transition-colors">
              Careers
            </Link>
            <Link href="/news" className="hover:text-mjdat-green transition-colors">
              News
            </Link>
            <Link href="/contact" className="hover:text-mjdat-green transition-colors">
              Contact
            </Link>
            <Link href="/support" className="hover:text-mjdat-green transition-colors">
              Support
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h4 className="text-md font-semibold">Legal</h4>
          <nav className="flex flex-col space-y-1 text-sm">
            <Link href="/privacy" className="hover:text-mjdat-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-mjdat-green transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-mjdat-green transition-colors">
              Cookie Policy
            </Link>
            <Link href="/gdpr-compliance" className="hover:text-mjdat-green transition-colors">
              GDPR Compliance
            </Link>
          </nav>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} MJDAt Solutions. All rights reserved.
        <br />
        Main Developer- Nahom Tewodros
      </div>
    </footer>
  )
}
