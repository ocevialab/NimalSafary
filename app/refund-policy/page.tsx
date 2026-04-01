import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../Components/Nav";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy - Nimal Safari",
  description:
    "Refund and cancellation terms for Nimal Safari bookings, including advance payments, rescheduling, and online payment refunds.",
  keywords: [
    "Nimal Safari refund",
    "safari cancellation",
    "booking refund Sri Lanka",
    "Yala safari cancellation",
  ],
};

export default function RefundPolicyPage() {
  return (
    <>
      <Nav textcolor="text-black" />
      <main className="w-full px-6 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-8 bg-background font-display">
        <div className="max-w-4xl mx-auto mt-20 lg:mt-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            Nimal Safari
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-base md:text-lg mb-8">
            <strong>Effective date:</strong> 26 March 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Overview</h2>
            <p>
              At Nimal Safari, we understand that travel plans can change. This
              Refund &amp; Cancellation Policy outlines the conditions under which
              refunds are provided for bookings made through our website or
              directly with our team. By completing a booking and making payment,
              you agree to this policy. This policy should be read together with
              our{" "}
              <Link
                href="/terms-and-conditions"
                className="text-primary underline underline-offset-2"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              2. Booking Confirmation &amp; Advance Payment
            </h2>
            <p>
              All bookings require a 50% advance payment at the time of
              reservation. The remaining 50% balance is due prior to the
              commencement of the safari. Your booking is only confirmed once the
              advance payment has been received and acknowledged by Nimal Safari.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              3. Customer Cancellations
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              3.1 Standard Cancellation Terms
            </h3>
            <p className="mb-2">
              The following cancellation terms apply to all standard bookings:
            </p>
            <p className="mb-2 font-medium">Cancellation 24 hours or more before safari:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Full refund of the advance payment.</li>
              <li>Refund will be processed within 7–14 business days.</li>
              <li>Refund credited to the original payment method.</li>
            </ul>
            <p className="mb-2 font-medium">
              Cancellation less than 24 hours before safari:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>No refund will be issued.</li>
              <li>This applies to both the advance payment and any balance paid.</li>
              <li>The full booking amount will be forfeited.</li>
            </ul>
            <p className="mb-2 font-medium">
              No-show (failure to appear at agreed time/location):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>No refund will be issued.</li>
              <li>The booking will be treated as cancelled without notice.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">3.2 How to Cancel</h3>
            <p className="mb-2">
              To cancel a booking, you must notify Nimal Safari in writing via
              email or WhatsApp, clearly stating your booking reference, name, and
              safari date. Verbal cancellations are not accepted as sufficient
              notice.
            </p>
            <p>
              The date and time of your written cancellation notice will be used to
              determine the applicable refund tier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              4. Cancellations by Nimal Safari
            </h2>
            <p className="mb-2">
              In certain circumstances, we may need to cancel a confirmed booking.
              Where Nimal Safari initiates a cancellation, the following applies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full refund of all amounts paid.</li>
              <li>We will notify you as early as possible via phone or email.</li>
              <li>Where feasible, we will offer a rescheduled date as an alternative.</li>
              <li>
                We reserve the right to cancel bookings at our discretion (e.g., for
                safety concerns, overbooking errors, or operational reasons) with a
                full refund guaranteed.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              5. Force Majeure &amp; Circumstances Beyond Our Control
            </h2>
            <p className="mb-2">
              Nimal Safari shall not be liable for cancellations, delays, or
              disruptions caused by events beyond our reasonable control,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Adverse weather conditions (heavy rain, flooding, storm).</li>
              <li>Natural disasters (earthquakes, tsunamis, wildfires).</li>
              <li>Government restrictions or orders.</li>
              <li>
                Park closures declared by the Department of Wildlife Conservation.
              </li>
              <li>Civil unrest, strikes, or public emergencies.</li>
            </ul>
            <p className="mb-2">
              In such cases, we will offer one of the following at our discretion:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                Rescheduling to a mutually agreed alternative date (preferred
                option).
              </li>
              <li>A partial refund based on costs already incurred.</li>
              <li>A full refund if no alternative arrangement can be made.</li>
            </ul>
            <p>We will communicate our decision promptly and fairly.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              6. Safari Duration &amp; Service Disruption
            </h2>
            <p className="mb-3">
              If a safari is cut short due to circumstances within our control
              (e.g., vehicle breakdown, driver negligence), a proportional refund or
              complimentary rebook may be offered at our discretion.
            </p>
            <p>
              No refund or compensation will be offered for reduced wildlife
              sightings, as animal encounters cannot be guaranteed by their nature.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              7. Rescheduling Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customers who wish to reschedule (rather than cancel) should
                contact us at least 24 hours before the safari.
              </li>
              <li>
                Rescheduling is subject to availability and is not guaranteed.
              </li>
              <li>
                Rescheduled bookings are subject to the same cancellation policy
                from the new booking date.
              </li>
              <li>
                Only one complimentary reschedule is permitted per booking.
                Further changes may incur an administrative fee.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              8. Online Payment Refund Process
            </h2>
            <p className="mb-2">
              Refunds for payments made through our website payment gateway will be
              processed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refunds are returned to the original payment method (credit card,
                debit card, or bank transfer).
              </li>
              <li>
                Processing time: 7–14 business days, depending on your bank or
                card issuer.
              </li>
              <li>
                Nimal Safari is not responsible for delays caused by third-party
                banks or payment processors.
              </li>
              <li>
                Any currency conversion or transaction fees charged by your bank
                are non-refundable.
              </li>
              <li>
                If you have not received your refund within 14 business days,
                please contact your bank first, then reach out to us with your
                booking reference.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              9. Non-Refundable Items
            </h2>
            <p className="mb-2">
              The following are strictly non-refundable under all circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Yala National Park entrance fees (paid directly to the Department
                of Wildlife Conservation).
              </li>
              <li>Government taxes and levies.</li>
              <li>Any third-party services arranged and paid on your behalf.</li>
              <li>Booking processing or administrative fees (if applicable).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">10. Disputes</h2>
            <p>
              If you are dissatisfied with a refund decision, please contact us in
              writing. We will review your case fairly and respond within 7 business
              days. Disputes that cannot be resolved amicably are subject to the laws
              of Sri Lanka and the jurisdiction of Sri Lankan courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              11. Contact for Cancellations &amp; Refunds
            </h2>
            <p className="font-semibold">Nimal Safari</p>
            <p>
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
          </section>
        </div>
      </main>
    </>
  );
}
