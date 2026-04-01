import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../Components/Nav";

export const metadata: Metadata = {
  title: "Terms & Conditions - Nimal Safari",
  description:
    "Terms and conditions for Nimal Safari safari services, bookings, and website use at Yala National Park, Sri Lanka.",
  keywords: [
    "Nimal Safari terms",
    "Yala National Park",
    "safari booking terms",
    "Sri Lanka safari",
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Nav textcolor="text-black" />
      <main className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display">
        <div className="max-w-4xl mx-auto mt-20 lg:mt-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            Nimal Safari
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-base md:text-lg mb-6">
            <strong>Effective date:</strong> 26 March 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              1. Introduction &amp; Definitions
            </h2>
            <p className="mb-4 text-base md:text-lg">
              These Terms &amp; Conditions (&quot;Terms&quot;) govern all safari
              services provided by Nimal Safari, including bookings made in
              person, via phone, WhatsApp, email, or through our website payment
              gateway. By making a booking and/or payment, you confirm that you
              have read, understood, and agreed to these Terms on behalf of
              yourself and all members of your party.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                &quot;Company&quot; / &quot;We&quot; / &quot;Us&quot; /
                &quot;Our&quot; refers to Nimal Safari.
              </li>
              <li>
                &quot;Customer&quot; / &quot;You&quot; / &quot;Your&quot;
                refers to the person making the booking and all party members.
              </li>
              <li>
                &quot;Safari&quot; refers to the jeep-based wildlife tour within
                Yala National Park, Sri Lanka.
              </li>
              <li>
                &quot;Website&quot; refers to{" "}
                <a
                  href="https://www.nimalsafari.lk"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.nimalsafari.lk
                </a>{" "}
                and its booking and payment systems.
              </li>
              <li>
                &quot;Park&quot; refers to Yala National Park, managed by the
                Department of Wildlife Conservation.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              2. Booking &amp; Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A 50% advance payment is required to confirm all bookings.</li>
              <li>
                The remaining balance must be paid in full prior to the start of
                the safari.
              </li>
              <li>
                Bookings are confirmed only upon receipt and acknowledgement of
                the advance payment.
              </li>
              <li>
                Online payments are processed securely through our website&apos;s
                PCI-DSS compliant payment gateway.
              </li>
              <li>
                Receipts and booking confirmations will be sent to the email
                address provided.
              </li>
              <li>
                We reserve the right to decline or cancel any booking at our
                discretion, with a full refund if cancellation is initiated by us.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              3. Pricing &amp; Inclusions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Quoted prices include jeep hire and driver/guide services only,
                unless otherwise stated in writing.
              </li>
              <li>
                Yala National Park entrance fees are not included and are subject
                to change by the Department of Wildlife Conservation.
              </li>
              <li>
                Government taxes, surcharges, meals, and personal expenses are
                not included.
              </li>
              <li>
                Additional services must be agreed and confirmed in writing prior
                to the safari.
              </li>
              <li>
                All prices on our website are displayed in Sri Lankan Rupees
                (LKR) or USD, as specified. Exchange rates may apply for foreign
                currency payments.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              4. Pickup &amp; Transfers
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Complimentary pickup and drop-off is available within
                Tissamaharama.
              </li>
              <li>
                Additional charges apply for pickups from outside this area and
                will be confirmed at booking.
              </li>
              <li>
                Customers must provide accurate pickup location and contact
                details at the time of booking.
              </li>
              <li>
                Nimal Safari is not liable for delays or disruptions resulting
                from incorrect information provided by the customer.
              </li>
              <li>
                Pickup times are agreed in advance; being ready on time is the
                customer&apos;s responsibility.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              5. Customer Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customers must be ready at the agreed pickup time and location.
              </li>
              <li>
                Late arrivals may result in a reduced safari duration or
                cancellation without refund.
              </li>
              <li>
                All safety instructions given by the driver/guide must be
                followed at all times.
              </li>
              <li>
                Customers must treat the natural environment, wildlife, and park
                staff with respect.
              </li>
              <li>
                You are responsible for ensuring all members of your party,
                including minors, comply with these Terms.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              6. Online Payments &amp; Website Transactions
            </h2>
            <p className="mb-3">
              By making a payment through our website, you agree to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You confirm that you are the authorised cardholder or account
                holder for the payment method used.
              </li>
              <li>
                All payment information submitted must be accurate and complete.
              </li>
              <li>
                Nimal Safari uses a secure, encrypted payment gateway. We do not
                store or have access to your full card details.
              </li>
              <li>
                Fraudulent payment attempts or chargebacks initiated in bad faith
                may result in legal action.
              </li>
              <li>
                In the event of a failed payment, your booking will not be
                confirmed. Please retry or contact us.
              </li>
              <li>
                Nimal Safari reserves the right to refuse or cancel orders where
                fraudulent activity is suspected.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              7. Changes &amp; Amendments to Bookings
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Requests to modify booking details (date, time, group size, or
                pickup location) must be made in advance.
              </li>
              <li>
                All amendments are subject to availability and must be confirmed
                in writing.
              </li>
              <li>
                Additional charges may apply depending on the nature of the
                change.
              </li>
              <li>
                Nimal Safari is not responsible for any costs incurred due to
                changes in park entry fees or government levies.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              8. Cancellation &amp; Refund Policy
            </h2>
            <p className="mb-3">
              Please refer to our separate{" "}
              <Link
                href="/refund-policy"
                className="text-primary underline underline-offset-2"
              >
                Refund &amp; Cancellation Policy
              </Link>{" "}
              for full details. In summary:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Cancellations made 24+ hours before the safari: full refund of
                advance payment.
              </li>
              <li>
                Cancellations made less than 24 hours before the safari: no
                refund.
              </li>
              <li>No-shows: no refund.</li>
              <li>
                Cancellations by Nimal Safari: full refund or reschedule
                offered.
              </li>
              <li>
                Refunds for online payments are processed to the original payment
                method within 7–14 business days.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              9. Weather, Park Regulations &amp; Force Majeure
            </h2>
            <p className="mb-3">
              All safari services are subject to prevailing weather conditions,
              park regulations, and Sri Lankan government policy. Nimal Safari
              shall not be liable for any cancellation, delay, or modification
              caused by events beyond our reasonable control, including but not
              limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Adverse weather or natural disasters.</li>
              <li>
                Park closures declared by the Department of Wildlife
                Conservation.
              </li>
              <li>Government orders, restrictions, or travel advisories.</li>
              <li>Civil unrest, epidemics, or force majeure events.</li>
            </ul>
            <p>
              In such cases, we will endeavour to offer a rescheduled booking or
              appropriate refund as described in our{" "}
              <Link
                href="/refund-policy"
                className="text-primary underline underline-offset-2"
              >
                Refund &amp; Cancellation Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              10. Wildlife Sightings Disclaimer
            </h2>
            <p className="mb-3">
              Nimal Safari does not guarantee the sighting of any particular
              species, including leopards, elephants, or any other wildlife.
              Animals move freely within their natural habitat, and sightings
              depend on entirely uncontrollable natural factors. No refund or
              compensation will be provided for unsatisfactory or absent wildlife
              sightings.
            </p>
            <p>
              We do, however, employ experienced naturalist guides committed to
              maximising your wildlife experience within the park.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              11. Code of Conduct &amp; Park Rules
            </h2>
            <p className="mb-3">
              All customers must comply with the rules and regulations of Yala
              National Park at all times. The following are strictly prohibited:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Littering or disposing of waste within the park.</li>
              <li>Feeding, disturbing, or attempting to touch wildlife.</li>
              <li>Standing up in, or climbing on, the safari vehicle.</li>
              <li>
                Making excessive noise or using flash photography in a
                disruptive manner.
              </li>
              <li>
                Consuming alcohol or controlled substances during the safari.
              </li>
              <li>
                Leaving the vehicle without permission from the guide.
              </li>
            </ul>
            <p>
              Failure to comply may result in the immediate termination of the
              safari without refund. Customers may also be reported to park
              authorities, and legal consequences may apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              12. Liability &amp; Limitation
            </h2>
            <p className="mb-3">
              To the fullest extent permitted by Sri Lankan law, Nimal Safari
              shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                Loss, theft, or damage to personal belongings during the safari.
              </li>
              <li>
                Personal injury arising from events beyond our reasonable control
                or from failure to follow safety instructions.
              </li>
              <li>Any indirect, consequential, or incidental losses.</li>
            </ul>
            <p>
              Participation in safari activities is undertaken entirely at the
              customer&apos;s own risk. The safari environment involves inherent
              risks associated with wild animals and natural terrain.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              13. Passenger Insurance
            </h2>
            <p className="mb-3">
              All safari vehicles operated by Nimal Safari are insured in
              accordance with Sri Lankan transport regulations, including basic
              passenger liability coverage.
            </p>
            <p className="mb-3">
              Customers are strongly advised to obtain comprehensive travel
              insurance prior to their safari, covering:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Medical treatment and emergency evacuation.</li>
              <li>Personal injury and accident.</li>
              <li>Loss, theft, or damage to personal belongings.</li>
              <li>Trip cancellation or interruption.</li>
              <li>Repatriation costs.</li>
            </ul>
            <p>
              Nimal Safari shall not be responsible for costs exceeding the
              limits of the vehicle&apos;s statutory insurance policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              14. Health &amp; Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Safaris may involve early mornings, extended periods in a moving
                vehicle, heat exposure, dust, and rough terrain.
              </li>
              <li>
                Customers with pre-existing medical conditions, disabilities, or
                special requirements must inform us at the time of booking.
              </li>
              <li>
                Pregnant travellers should consult their doctor before
                undertaking a safari.
              </li>
              <li>
                We reserve the right to refuse or restrict participation where
                safety may be compromised.
              </li>
              <li>
                Children must be supervised by a responsible adult at all times.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              15. Data Protection &amp; Communications
            </h2>
            <p>
              Your personal data is collected, used, and protected in accordance
              with our{" "}
              <Link
                href="/privacy-policy"
                className="text-primary underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              . By making a booking, you consent to us contacting you via phone,
              WhatsApp, or email for booking and operational purposes. Please
              refer to our full Privacy Policy for details on how we handle your
              data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              16. Intellectual Property
            </h2>
            <p>
              All content on our website, including text, images, logos, and
              design, is the intellectual property of Nimal Safari and is
              protected under applicable copyright laws. Unauthorised
              reproduction, distribution, or use of our content is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              17. Amendments to These Terms
            </h2>
            <p>
              Nimal Safari reserves the right to amend these Terms at any time.
              Updated Terms will be published on our website with a revised
              effective date. Bookings made prior to any amendment remain subject
              to the Terms in effect at the time of booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              18. Governing Law &amp; Jurisdiction
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                These Terms &amp; Conditions are governed by and construed in
                accordance with the laws of Sri Lanka.
              </li>
              <li>
                Any disputes arising from or in connection with these Terms
                shall be subject to the exclusive jurisdiction of the courts of
                Sri Lanka.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              19. Contact Information
            </h2>
            <p className="mb-2 font-semibold">Nimal Safari</p>
            <p className="mb-2">
              Website:{" "}
              <a
                href="https://www.nimalsafari.lk"
                className="text-primary underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.nimalsafari.lk
              </a>
            </p>
            <p className="mb-4">
              For bookings and enquiries, we are available 7 days a week.
            </p>
            <p>
              Thank you for choosing Nimal Safari. We look forward to giving you
              an unforgettable wildlife experience in the heart of Yala
              National Park.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
