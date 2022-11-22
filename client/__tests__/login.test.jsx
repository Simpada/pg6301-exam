import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../pages/login";
import React from "react";
import { RestaurantApiContext } from "../restaurantApiContext";
import { Simulate } from "react-dom/test-utils";

describe("login page component", () => {
  it("shows login form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Username:", "Password:"]);
  });

  it("logs in on submit", () => {
    const login = jest.fn();

    const element = document.createElement("div");

    ReactDOM.render(
      <RestaurantApiContext.Provider value={{ login }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </RestaurantApiContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input:nth-of-type(1) input"), {
      target: { value: "MrTest" },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "TestPassword" },
    });
    Simulate.submit(element.querySelector("form"));

    expect(login).toBeCalledWith({
      username: "MrTest",
      password: "TestPassword",
    });
  });
});
