import type { LoaderFunctionArgs } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { Layout } from "~/Layouts/Layout";
import Button from "~/components/Button";
import { isAuthenticated } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await isAuthenticated(request);

  return null;
}

export default function () {
  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum beatae
          similique exercitationem quam, rerum natus nemo at veritatis
          dignissimos pariatur facilis repudiandae harum sed rem est adipisci
          ipsum recusandae corporis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nobis
          enim facere officia harum assumenda quaerat quod voluptatibus non
          eligendi. Aliquid natus consequuntur rem harum. Alias non iste quae
          autem?
        </p>
        <ClientOnly>
          {
            () => (
              <div className="py-6">
                <Button />
              </div>
            )
          }
        </ClientOnly>
      </div>
    </Layout>
  );
}