import { useLoaderData } from '@remix-run/react';
import { UsersTable, getUsers } from '~/features/Users';
import { ErrorFeedback } from '~/components';

export const loader = async () => {
  return await getUsers();
};

export default function Users() {
  const users = useLoaderData<typeof loader>();

  return <UsersTable users={users} />
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorFeedback />;
}