import React from "react";
import {fetchJSON} from "./lib/fetchJSON";


export const RestaurantApiContext = React.createContext({
    async menu(query) {
        return await fetchJSON("/api/menu?" + new URLSearchParams(query));
    },
    async addItem(query) {
        return await fetchJSON("/api/menu/add" + new URLSearchParams(query));
    }
})