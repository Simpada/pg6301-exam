import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { Application } from "../application";
import React from "react";

describe("application component", () => {
  it("shows top bar", async () => {
    const domElement = document.createElement("div");

    await act(async () => {
      const root = createRoot(domElement);
      root.render(<Application />);
    });

    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
