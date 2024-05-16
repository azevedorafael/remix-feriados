import type { ActionFunctionArgs } from "@remix-run/node";
import { UserForm, saveUser, schema } from "~/features/Users";
import { makeDomainFunction } from 'domain-functions'
import { ErrorFeedback } from "~/components";
import { formAction } from "~/remix-forms";

const mutation = makeDomainFunction(schema)(
  async (data) => await saveUser(data)
);

export const action = async ({ request }: ActionFunctionArgs) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: '/users',
  })

export default function () {
  return <UserForm />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorFeedback />;
}