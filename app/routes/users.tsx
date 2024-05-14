import { useLoaderData } from '@remix-run/react';
import { db } from '../db.server';
import { UsersTable } from '~/components/UsersTable';

export const loader = async () => {
  const users = await db.user.findMany();
  return users;
};

export default function Users() {
  const users = useLoaderData<typeof loader>();

  return <UsersTable users={users} />
}