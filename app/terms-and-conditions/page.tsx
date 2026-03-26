import type { Metadata } from "next";
import Nav from "../Components/Nav";

export const metadata: Metadata = {
  title: "Terms & Conditions - Nimal Safari",
  description:
    "Read the terms and conditions for Nimal Safari tours in Yala National Park, Sri Lanka.",
  keywords: [
    "Nimal Safari terms",
    "Yala National Park terms",
    "safari terms and conditions",
    "Sri Lanka safari booking policy",
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Nav textcolor="text-black" />
      <main className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display">
        <div className="max-w-4xl mx-auto mt-20 lg:mt-28">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Nimal Safari - Terms & Conditions
          </h1>
          <p className="text-base md:text-lg mb-1">
            Yala National Park, Sri Lanka
          </p>
          <p className="text-base md:text-lg mb-6">
            <strong>Effective Date:</strong> 26th March 2026
          </p>
          <p className="mb-8 text-base md:text-lg">
            Welcome to Nimal Safari. These Terms & Conditions apply to all
            safari services provided by us. By making a booking, you confirm
            that you have read, understood, and agreed to these terms.
          </p>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              1. Definitions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                &quot;Company&quot; / &quot;We&quot; / &quot;Us&quot; refers to
                Nimal Safari.
              </li>
              <li>
                &quot;Customer&quot; / &quot;You&quot; refers to the person
                making the booking and all members of their party.
              </li>
              <li>
                &quot;Safari&quot; refers to the jeep-based wildlife tour within
                Yala National Park.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              2. Booking & Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                A 50% advance payment is required to confirm all bookings.
              </li>
              <li>
                The remaining balance must be paid prior to the start of the
                safari.
              </li>
              <li>
                Bookings are only confirmed once payment has been received and
                acknowledged.
              </li>
              <li>
                We reserve the right to decline or cancel any booking at our
                discretion (with a full refund if initiated by us).
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              3. Pricing & Inclusions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Quoted prices include jeep hire and driver services only unless
                otherwise stated.
              </li>
              <li>
                Entrance fees to Yala National Park, government taxes, and meals
                are not included.
              </li>
              <li>
                Entrance fees are set by the Department of Wildlife Conservation
                (Sri Lanka) and may change without prior notice.
              </li>
              <li>
                Any additional services requested will be charged separately and
                agreed in advance.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              4. Pickup & Transfers
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complimentary pickup is provided within Tissamaharama.</li>
              <li>Additional charges apply for pickups outside this area.</li>
              <li>
                Customers must provide accurate pickup details at the time of
                booking.
              </li>
              <li>
                Delays caused by incorrect information may impact the safari
                duration.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              5. Customer Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customers must be ready at the agreed time and location.</li>
              <li>
                Late arrivals may result in reduced safari time or cancellation
                without refund.
              </li>
              <li>
                Customers must follow all safety instructions given by the
                driver/guide.
              </li>
              <li>
                Appropriate behaviour and respect for wildlife and environment
                are required at all times.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              6. Changes & Amendments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Requests to change booking details must be made in advance.
              </li>
              <li>All changes are subject to availability.</li>
              <li>
                Additional charges may apply depending on the nature of the
                change.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              7. Cancellation & Refund Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>24+ hours before safari: Full refund of advance payment.</li>
              <li>Less than 24 hours: No refund.</li>
              <li>
                Refunds will be processed within a reasonable timeframe via the
                original payment method where possible.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              8. Weather, Park Regulations & Force Majeure
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Safaris are subject to weather conditions, park regulations, and
                government policies.
              </li>
              <li>
                We shall not be liable for cancellations or delays caused by
                events beyond our control, including but not limited to:
              </li>
              <li>Adverse weather</li>
              <li>Natural disasters</li>
              <li>Government restrictions</li>
              <li>Park closures</li>
              <li>
                In such cases, customers may be offered rescheduling, or a
                partial or full refund, depending on circumstances.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              9. Wildlife Sightings Disclaimer
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wildlife sightings cannot be guaranteed.</li>
              <li>
                Animals move freely in their natural habitat, and sightings
                depend on many uncontrollable factors.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              10. Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To the fullest extent permitted by law, Nimal Safari shall not
                be liable for:
              </li>
              <li>Loss or damage to personal belongings.</li>
              <li>
                Personal injury arising from events beyond our reasonable
                control.
              </li>
              <li>
                Participation in safari activities is undertaken at the
                customer&apos;s own risk.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              11. Code of Conduct (Yala National Park Rules)
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customers must comply with all park rules and regulations.
              </li>
              <li>The following are strictly prohibited:</li>
              <li>Littering.</li>
              <li>Feeding or disturbing wildlife.</li>
              <li>Standing up or behaving dangerously inside the vehicle.</li>
              <li>
                Failure to comply may result in immediate termination of the
                safari without refund.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              12. Passenger Insurance & Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All safari vehicles are insured in accordance with Sri Lankan
                transport regulations, including basic passenger coverage in
                case of an accident.
              </li>
              <li>
                While we prioritise safety and use experienced drivers, safari
                activities involve inherent risks due to the natural
                environment.
              </li>
              <li>
                Customers are strongly advised to obtain comprehensive travel
                insurance covering:
              </li>
              <li>Medical treatment and emergency evacuation.</li>
              <li>Personal injury and accidents.</li>
              <li>Loss, theft, or damage to personal belongings.</li>
              <li>Trip cancellation or interruption.</li>
              <li>
                Nimal Safari shall not be responsible for any costs exceeding
                the limits of the vehicle&apos;s insurance policy.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              13. Health & Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Safaris may involve long hours, heat exposure, and uneven
                terrain.
              </li>
              <li>
                Customers with medical conditions or special requirements must
                inform us in advance.
              </li>
              <li>
                We reserve the right to refuse participation where safety may be
                compromised.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              14. Data & Communication
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customer contact details are used solely for booking and
                operational purposes.
              </li>
              <li>
                We may contact you via phone, WhatsApp, or email regarding your
                safari.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              15. Governing Law
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                These Terms & Conditions are governed by the laws of Sri Lanka.
              </li>
              <li>
                Any disputes shall be subject to the jurisdiction of Sri Lankan
                courts.
              </li>
            </ul>
          </section>

          <section className="mb-2">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              Contact - Nimal Safari
            </h2>
            <p className="mb-2">
              For bookings and enquiries, please contact us via phone, WhatsApp,
              or email.
            </p>
            <p>
              Thank you for choosing Nimal Safari. We look forward to providing
              you with a safe and memorable experience in Yala National Park.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
