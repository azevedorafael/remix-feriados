import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { Elements } from "@stripe/react-stripe-js";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getOrder, updateOrder } from "~/features/Checkout";
import { createPaymentIntent, retrievePaymentIntent } from "~/features/Payment";
import { getSession } from "~/session.server";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "~/features/Payment/CheckoutForm";

const stripePromise = loadStripe(ENV.STRIPE_PUBLIC_KEY)

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const orderId = session.get("orderId")
  const order = await getOrder(orderId ?? "")
  const totals = JSON.parse(order?.totals ?? "")
  
  let paymentIntent;

  if (order?.stripePaymentIntentId) {
    paymentIntent = await retrievePaymentIntent(order.stripePaymentIntentId);
  } else {
    paymentIntent = await createPaymentIntent(
      Math.ceil(totals.total)
    )

    await updateOrder(session.get("orderId") ?? "", {
      stripePaymentIntentId: paymentIntent.id,
    })
  }

  return json({
    paymentIntent,
  })
}

export default function () {
  const { paymentIntent } = useLoaderData<typeof loader>();

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentIntent.client_secret! }}
    >
      <CheckoutForm />
      <Outlet />
    </Elements>
  );
}