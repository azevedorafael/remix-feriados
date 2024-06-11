import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
import productsMock from "~/../tests/mocks/products.json";
import userEvent from "@testing-library/user-event";
import { createRemixStub } from "@remix-run/testing";
import { RemixBrowser } from '@remix-run/react'

it("Should render the Cart", async () => {
  function MyComponent() {
    return <Cart products={productsMock.splice(0, 3)} />
  }

  const RemixStub = createRemixStub([
    {
      path: "/cart",
      Component: MyComponent,
    },
  ]);

  render(<RemixStub />, { wrapper: RemixBrowser });

  expect(screen.getByTestId("product-quantity").textContent).toBe("3");

  await userEvent.click(screen.getByRole("button"));

  // screen.debug(screen.getByTestId("product-quantity"));
});