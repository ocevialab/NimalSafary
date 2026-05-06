import StatusClient from "./StatusClient";

export default async function PaymentStatusPage(
  props: { params: Promise<{ token: string }> },
) {
  const { token } = await props.params;
  return <StatusClient token={token} />;
}
