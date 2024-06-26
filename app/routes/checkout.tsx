import { Checkout,checkoutSchema,createOrder, getTotals } from "~/features/Checkout";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import formsStyles from "~/styles/form.css";

export function links() {
  return [{ rel: "stylesheet", href: formsStyles }];
}

export async function action({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const products = session.get("cartProducts") ?? [];
  const totals = getTotals({ products });
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = await createOrder({
    ...checkoutSchema.parse(data),
    products: JSON.stringify(products),
    totals: JSON.stringify(totals),
  });

  session.set("orderId", order.id);

  return redirect("/payment", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const products = session.get("cartProducts") || [];
  const totals = getTotals({ products });

  return json({
    products,
    totals,
  });
}

export default function () {
  const { products, totals } = useLoaderData<typeof loader>();
  return <Checkout products={products} totals={totals} />;
}