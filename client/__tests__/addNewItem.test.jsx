import { MemoryRouter } from "react-router-dom";
import { AddNewItem } from "../pages/addNewItem";
import * as ReactDOM from "react-dom";
import React from "react";
import { RestaurantApiContext } from "../restaurantApiContext";
import { Simulate } from "react-dom/test-utils";

describe("add new item component", () => {
  it("shows item form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddNewItem ignoreCookie={true} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Dish Name", "Ingredients", "Price", "Category"]);
  });

  it("adds item on submit", () => {
    const addItem = jest.fn();

    const element = document.createElement("div");

    ReactDOM.render(
      <RestaurantApiContext.Provider value={{ addItem }}>
        <MemoryRouter>
          <AddNewItem ignoreCookie={true} />
        </MemoryRouter>
      </RestaurantApiContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input:nth-of-type(1) input"), {
      target: { value: "test meal" },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "an ingredient" },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(3) input"), {
      target: { value: "9001" },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(4) input"), {
      target: { value: "odd stuff" },
    });
    Simulate.submit(element.querySelector("form"));

    expect(addItem).toBeCalledWith({
      name: "test meal",
      ingredients: ["an", "ingredient"],
      price: 9001,
      category: "odd stuff",
    });
  });
});
