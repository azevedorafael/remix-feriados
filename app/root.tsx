import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "./tailwind.css";
import { getLoggedUser } from "./session.server";
import { UserContext } from "./features/Users/context";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderFunctionArgs){
  // const loggedUser = await getLoggedUser(request)

  return json({
    ENV: {
      TIMEOUT: ENV.TIMEOUT,
      STRIPE_PUBLIC_KEY: ENV.STRIPE_PUBLIC_KEY,
    },
    // loggedUser,
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()

  return (
    // <UserContext.Provider value={{ loggedUser }}>
      <Outlet />
    // </UserContext.Provider>
  )
}
