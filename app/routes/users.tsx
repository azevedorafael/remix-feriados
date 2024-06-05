import { defer, type LoaderFunctionArgs } from "@remix-run/node";
import { Await,useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Layout } from "~/Layouts/Layout";
import { ErrorFeedback } from "~/components";
import { Loading } from "~/components/Loading";
import { getUsers, UsersTable } from "~/features/Users";
import { isAuthenticated } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await isAuthenticated(request)

  return defer({ users: getUsers()},{
    headers: {
      "Cache-Control": "max-age=60"
    }
  });
}

export default function () {
  const { users: usersPromise } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Suspense fallback={<Loading/>}>
      <Await resolve={usersPromise}>
        {(users) => <UsersTable users={users}/>}
      </Await>
      </Suspense>
    </Layout>
  );
}

export function ErrorBoundary() {
  // Envia o erro para um serviço externo! Ex. Sentry, Bugsnag, etc.
  return <ErrorFeedback />;
}