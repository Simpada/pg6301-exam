import {MemoryRouter} from "react-router-dom";
import {AddNewItem} from "../pages/addNewItem";
import * as ReactDOM from "react-dom";
import React from "react";


describe("add new item component", () => {
    it("shows item form", () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <AddNewItem/>
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
});