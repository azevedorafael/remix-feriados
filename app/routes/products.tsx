import { getProduct, getProducts, ProductList } from "~/features/Products";
import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Cart } from "~/features/Cart";
import  { ActionFunctionArgs } from "@remix-run/node";
import { commitSession, getSession } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const product = await getProduct({ id: Number(data.productId) });
  const session = await getSession(request.headers.get("Cookie"));

  session.set("cartProducts", [
    ...(session.get("cartProducts") ?? []),
    product,
  ]);

  return redirect("/products", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await getProducts();
  const session = await getSession(request.headers.get("Cookie"));
  const cartProducts = session.get("cartProducts") ?? [];
  // throw new Error("This is an error")
  return json({ products, cartProducts });  
}

export default function () {
  const { products, cartProducts } = useLoaderData<typeof loader>();
  return (
    <>
      <Cart products={cartProducts} />
      <ProductList products={products} />
    </>
  );
}