import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '../db.server';

export const loader = async () => {
  const users = await db.user.findMany();
  return json({ users });
};

export default function Users() {
  const users = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Conexão com DB</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}