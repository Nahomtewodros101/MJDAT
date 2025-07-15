import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import {
  BriefcaseIcon,
  UsersIcon,
  DatabaseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Building2Icon,
  DollarSignIcon,
  CodeIcon,
  LightbulbIcon,
  HandshakeIcon,
  ScaleIcon,
} from "lucide-react"
import { ServiceVisual } from "@/components/service-visual" // Ensure ServiceVisual is imported

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Services</h1>

        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          MJDAt Solutions offers a comprehensive suite of Business Process Outsourcing services designed to streamline
          your operations, reduce costs, and enhance efficiency. Explore how our tailored solutions can benefit your
          business.
        </p>

        <section id="logistics-support" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center text-center">
            <ServiceVisual
              icon={BriefcaseIcon}
              title="Logistics Support"
              description="Efficient management of supply chain and transportation processes."
              bgColorClass="bg-gradient-to-br from-mjdat-green to-mjdat-light-green"
              textColorClass="text-white"
              iconColorClass="text-white"
              className="mb-6"
            />
            <h2 className="text-2xl font-semibold text-mjdat-green">Logistics Support</h2>
            <p className="text-gray-300 text-sm mt-2">Streamline your supply chain with our expert support.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ServiceVisual
              icon={UsersIcon}
              title="Customer Service"
              description="Deliver exceptional customer experiences 24/7."
              bgColorClass="bg-gradient-to-br from-gray-100 to-gray-200"
              textColorClass="text-mjdat-dark"
              iconColorClass="text-mjdat-green"
              className="mb-6"
            />
            <h2 className="text-2xl font-semibold text-mjdat-green">Customer Service</h2>
            <p className="text-gray-300 text-sm mt-2">Enhance satisfaction with our dedicated support teams.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ServiceVisual
              icon={DatabaseIcon}
              title="Data Entry & Processing"
              description="Accurate and efficient data management solutions."
              bgColorClass="bg-gradient-to-br from-mjdat-green to-mjdat-light-green"
              textColorClass="text-white"
              iconColorClass="text-white"
              className="mb-6"
            />
            <h2 className="text-2xl font-semibold text-mjdat-green">Data Entry & Processing</h2>
            <p className="text-gray-300 text-sm mt-2">Ensure data integrity and accessibility.</p>
          </div>
        </section>

        {/* New Service Sections */}
        <section id="human-resources" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Human Resources</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ServiceVisual
              icon={Building2Icon}
              title="HR Management"
              description="Comprehensive HR solutions from recruitment to payroll."
              bgColorClass="bg-gradient-to-br from-mjdat-light-green to-mjdat-green"
              textColorClass="text-white"
              iconColorClass="text-white"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-300 mb-4">
                Our Human Resources BPO services cover the full employee lifecycle, allowing you to focus on your core
                business. We handle everything from talent acquisition and onboarding to payroll processing, benefits
                administration, and compliance.
              </p>
              <p className="text-gray-400 text-sm">
                Ensure a smooth and efficient HR operation with our expert support.
              </p>
            </div>
          </div>
        </section>

        <section id="financial-services" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Financial Services</h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <ServiceVisual
              icon={DollarSignIcon}
              title="Financial Operations"
              description="Expert handling of accounting, bookkeeping, and financial analysis."
              bgColorClass="bg-gradient-to-br from-gray-100 to-gray-200"
              textColorClass="text-mjdat-dark"
              iconColorClass="text-mjdat-green"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-right">
              <p className="text-lg text-gray-300 mb-4">
                Optimize your financial processes with our specialized BPO services. We provide accurate and timely
                financial reporting, accounts payable/receivable management, and comprehensive financial analysis to
                support your strategic decisions.
              </p>
              <p className="text-gray-400 text-sm">Gain better control and insights into your financial health.</p>
            </div>
          </div>
        </section>

        <section id="digital-marketing" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Digital Marketing</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ServiceVisual
              icon={LightbulbIcon}
              title="Marketing Campaigns"
              description="Boost your online presence and reach with targeted digital strategies."
              bgColorClass="bg-gradient-to-br from-mjdat-green to-mjdat-light-green"
              textColorClass="text-white"
              iconColorClass="text-white"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-300 mb-4">
                Expand your market reach and engage your audience effectively with our digital marketing BPO services.
                From SEO and content creation to social media management and paid advertising, we craft strategies that
                deliver measurable results and drive growth.
              </p>
              <p className="text-gray-400 text-sm">Enhance your brand visibility and customer engagement.</p>
            </div>
          </div>
        </section>

        <section id="it-support" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">IT Support</h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <ServiceVisual
              icon={CodeIcon}
              title="Technical Assistance"
              description="Reliable technical support and infrastructure management."
              bgColorClass="bg-gradient-to-br from-gray-100 to-gray-200"
              textColorClass="text-mjdat-dark"
              iconColorClass="text-mjdat-green"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-right">
              <p className="text-lg text-gray-300 mb-4">
                Ensure seamless operations with our dedicated IT Support BPO services. We provide 24/7 technical
                assistance, network monitoring, cybersecurity solutions, and software maintenance to keep your systems
                running smoothly and securely.
              </p>
              <p className="text-gray-400 text-sm">Minimize downtime and maximize productivity with expert IT care.</p>
            </div>
          </div>
        </section>

        <section id="process-automation" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Process Automation</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ServiceVisual
              icon={ScaleIcon}
              title="RPA Implementation"
              description="Automate repetitive tasks to boost efficiency and accuracy."
              bgColorClass="bg-gradient-to-br from-mjdat-green to-mjdat-light-green"
              textColorClass="text-white"
              iconColorClass="text-white"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-300 mb-4">
                Transform your business operations by automating repetitive and rule-based tasks with our Process
                Automation BPO services. We implement Robotic Process Automation (RPA) solutions that reduce manual
                errors, accelerate workflows, and free up your team for more strategic initiatives.
              </p>
              <p className="text-gray-400 text-sm">
                Achieve higher operational efficiency and cost savings through automation.
              </p>
            </div>
          </div>
        </section>

        <section id="business-consulting" className="py-16 border-t border-mjdat-green/20">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Business Consulting</h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <ServiceVisual
              icon={HandshakeIcon}
              title="Strategic Guidance"
              description="Expert advice to optimize strategies and achieve business goals."
              bgColorClass="bg-gradient-to-br from-gray-100 to-gray-200"
              textColorClass="text-mjdat-dark"
              iconColorClass="text-mjdat-green"
              className="mb-6 md:mb-0"
            />
            <div className="text-center md:text-right">
              <p className="text-lg text-gray-300 mb-4">
                Leverage our deep industry knowledge to drive strategic growth and operational excellence. Our Business
                Consulting BPO services provide expert analysis, actionable insights, and tailored strategies to help
                you navigate complex challenges, optimize performance, and achieve your long-term objectives.
              </p>
              <p className="text-gray-400 text-sm">
                Make informed decisions and unlock your business's full potential.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mt-16">
          <h2 className="text-3xl font-semibold text-mjdat-green mb-4">Ready to Optimize Your Business?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us today to discuss your specific BPO needs and how MJDAt Solutions can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
          >
            Get a Free Consultation <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
