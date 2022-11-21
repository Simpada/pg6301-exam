import {Menu} from "../pages/menu";
import React from "react";
import * as ReactDOM from "react-dom";
import {RestaurantApiContext} from "../restaurantApiContext";
import { act, Simulate } from "react-dom/test-utils";


describe("Menu component", () => {
    it("shows loading screen", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(<Menu/>, domElement);
        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("shows menu", async () => {
        const menu = [{ name: "item 1", ingredients: ["egg"]}, { name: "item 2", ingredients: ["bread"]}];
        const domElement = document.createElement("div");
        ReactDOM.render(<Menu/>, domElement);
        await act(async () => {
            ReactDOM.render(
                <RestaurantApiContext.Provider value={{menu: () => menu}}>
                    <Menu/>
                </RestaurantApiContext.Provider>,
                domElement
            );
        })

        expect(
            Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
        ).toEqual(["item 1", "item 2"]);
        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("queries by category and price", async() => {
        const domElement = document.createElement("div");
        const menu = jest.fn(() => []);
        await act(async () => {
            ReactDOM.render(
                <RestaurantApiContext.Provider value={{menu}}>
                    <Menu/>
                </RestaurantApiContext.Provider>,
                domElement
            );
        });
        Simulate.change(domElement.querySelector("#category-query"), {
            target: {value: "vegetarian"},
        });
        Simulate.change(domElement.querySelector("#price-query"), {
            target: {value: "10"},
        });

        await act(async () => {
            await Simulate.submit(domElement.querySelector("form"));
        });
        expect(menu).toHaveBeenCalledWith({
            category: "vegetarian",
            price: "10"
        });
    });

    it("shows error message", async () => {
        const domElement = document.createElement("div");
        await act(async() => {
            const menu = () => {
                throw new Error("No food here!");
            };
            ReactDOM.render(
                <RestaurantApiContext.Provider value={{menu}}>
                    <Menu/>
                </RestaurantApiContext.Provider>,
                domElement
            );
        });
        expect(domElement.querySelector("#error-text").innerHTML).toEqual(
            "Error: No food here!"
        );
        expect(domElement.innerHTML).toMatchSnapshot();
    });
});
