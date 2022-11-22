import * as React from "react";
import { FrontPage } from "../pages/frontPage";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

describe("front page component", () => {
  it("shows error page", async () => {
    const domElement = document.createElement("div");

    await act(async () => {
      const root = createRoot(domElement);
      root.render(
        <MemoryRouter>
          <FrontPage />
        </MemoryRouter>
      );
    });

    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows front page", async () => {
    const domElement = document.createElement("div");

    await act(async () => {
      const root = createRoot(domElement);
      root.render(
        <MemoryRouter>
          <FrontPage skip={true} />
        </MemoryRouter>
      );
    });

    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
