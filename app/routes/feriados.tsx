import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from '@remix-run/react'

type Feriado = {
  name: string,
  date: string,
  type: string,
}

export async function loader(data: LoaderFunctionArgs) {
  const feriados:Feriado[] = await fetch('https://brasilapi.com.br/api/feriados/v1/2024').then(res => res.json())
  console.log(ENV.DB_CONNECTION_STRING);
  console.log(ENV.TIMEOUT);

  return json(feriados)
}

export default function () {
  const feriados = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Feriados Nacionais - 2024 </h1>
      <ul>
        {
          feriados.map(({name,date}) => <li key={name}>{`${name} - ${date}`}</li>)
        }
      </ul>
      <span>DB TIMEOUT: {ENV.TIMEOUT}</span>
    </>
  );
}