import type { Metadata } from "next";
import Nav from "../Components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy - Nimal Safari",
  description:
    "How Nimal Safari collects, uses, and protects your personal data when you book safari tours at Yala National Park, Sri Lanka.",
  keywords: [
    "Nimal Safari privacy",
    "data protection",
    "safari booking privacy",
    "Sri Lanka",
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav textcolor="text-black" />
      <main className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display">
        <div className="max-w-4xl mx-auto mt-20 lg:mt-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            Nimal Safari
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg mb-8">
            <strong>Effective date:</strong> 26 March 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              1. Introduction
            </h2>
            <p className="mb-3">
              Nimal Safari (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
              committed to protecting the privacy and personal data of our
              customers. This Privacy Policy explains how we collect, use,
              store, and protect your information when you book or enquire about
              our safari tours at Yala National Park, Sri Lanka, including when
              you make payments through our website.
            </p>
            <p>
              By using our website and services, you agree to the collection and
              use of your information as described in this Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              2.1 Personal Information
            </h3>
            <p className="mb-2">
              When you make a booking or enquiry, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Full name and contact details (phone number, email address).
              </li>
              <li>
                Billing and payment information (processed securely via our
                payment gateway).
              </li>
              <li>Pickup location and travel preferences.</li>
              <li>Number of persons in your party and nationality.</li>
              <li>
                Health or medical conditions (only when disclosed voluntarily
                for safety purposes).
              </li>
              <li>
                Passport or ID details (if required for park entry
                documentation).
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">
              2.2 Technical &amp; Usage Information
            </h3>
            <p className="mb-2">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>IP address and browser type.</li>
              <li>Pages visited and time spent on our website.</li>
              <li>Device and operating system information.</li>
              <li>Referral URLs and cookies.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">
              2.3 Payment Information
            </h3>
            <p>
              All payment card data is processed through our PCI-DSS compliant
              third-party payment gateway. Nimal Safari does not store, process,
              or transmit your full card details on our servers. Payment
              processors may retain transactional data in accordance with their
              own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-2">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To confirm, manage, and deliver your safari booking.</li>
              <li>To process online payments securely.</li>
              <li>
                To communicate booking confirmations, updates, and itinerary
                details via phone, WhatsApp, or email.
              </li>
              <li>To coordinate pickup and transportation arrangements.</li>
              <li>
                To comply with government, park, and immigration regulations.
              </li>
              <li>To respond to queries, complaints, or refund requests.</li>
              <li>
                To improve our website, services, and customer experience.
              </li>
              <li>
                To send promotional offers or updates (only with your consent;
                you may opt out at any time).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              4. Legal Basis for Processing
            </h2>
            <p className="mb-2">
              We process your personal data on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Contractual necessity – to fulfil your booking and deliver
                services you have requested.
              </li>
              <li>
                Legal obligation – to comply with Sri Lankan laws and park
                regulations.
              </li>
              <li>
                Legitimate interests – to manage our business operations and
                improve our services.
              </li>
              <li>
                Consent – where you have opted into receiving marketing
                communications.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              5. Data Sharing &amp; Disclosure
            </h2>
            <p className="mb-2">
              We do not sell your personal data to third parties. We may share
              your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                Department of Wildlife Conservation (Sri Lanka) – for mandatory
                park entry registration.
              </li>
              <li>
                Payment gateway providers – to process secure online
                transactions.
              </li>
              <li>
                Authorised transport and logistics partners – to coordinate
                pickups and drop-offs.
              </li>
              <li>
                Law enforcement or government authorities – where required by
                Sri Lankan law.
              </li>
            </ul>
            <p>
              All third parties with whom we share data are required to handle
              your information securely and only for the purpose for which it
              was shared.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              6. Online Payment Security
            </h2>
            <p className="mb-2">
              We take the security of your financial information very seriously.
              Our website uses:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>SSL/TLS encryption (HTTPS) to protect data in transit.</li>
              <li>PCI-DSS compliant payment gateway for card processing.</li>
              <li>
                Tokenisation technology to avoid storing sensitive card data.
              </li>
            </ul>
            <p>
              In the event of a suspected security breach, we will notify
              affected customers in accordance with applicable Sri Lankan data
              protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              7. Cookies Policy
            </h2>
            <p className="mb-2">
              Our website uses cookies to enhance your browsing experience.
              These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                Essential cookies – required for the website to function (e.g.,
                session management, booking forms).
              </li>
              <li>
                Analytics cookies – to understand how visitors use our website
                (e.g., Google Analytics).
              </li>
              <li>
                Preference cookies – to remember your settings and language
                preferences.
              </li>
            </ul>
            <p>
              You may disable cookies through your browser settings. However,
              disabling essential cookies may affect the functionality of our
              booking system.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              8. Data Retention
            </h2>
            <p className="mb-2">
              We retain your personal data for as long as necessary to fulfil
              your booking and comply with our legal obligations. Typically:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                Booking records are retained for 3 years after the date of
                service.
              </li>
              <li>
                Payment transaction records are retained for 7 years for tax and
                accounting purposes.
              </li>
              <li>
                Marketing opt-in records are retained until you withdraw
                consent.
              </li>
            </ul>
            <p>
              After the retention period, your data will be securely deleted or
              anonymised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              9. Your Rights
            </h2>
            <p className="mb-2">
              Subject to applicable Sri Lankan law, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>
                Request deletion of your data (subject to legal obligations).
              </li>
              <li>
                Withdraw consent for marketing communications at any time.
              </li>
              <li>
                Lodge a complaint with the relevant Sri Lankan authority
                regarding data processing.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              10. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites (e.g., Yala
              National Park official site, payment gateways). We are not
              responsible for the privacy practices of those websites and
              encourage you to review their privacy policies separately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              11. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed at children under the age of 14 as
              independent customers. We do not knowingly collect personal
              information from minors without verifiable parental or guardian
              consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any material
              changes will be posted on our website with a revised effective
              date. Continued use of our services following such changes
              constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              13. Contact Us
            </h2>
            <p className="mb-2">
              For any questions, concerns, or requests regarding this Privacy
              Policy, please contact:
            </p>
            <p className="font-semibold">Nimal Safari</p>
            <p>Yala National Park, Sri Lanka</p>
            <p>
              Website:{" "}
              <a
                href="https://nimalsafari.com/contact"
                className="text-primary underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.nimalsafari.com : contact page
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
