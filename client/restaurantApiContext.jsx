import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const RestaurantApiContext = React.createContext({
  async fetchLogin(credentials) {
    return await fetchJSON("/api/login", credentials);
  },
  async login(credentials) {
    return await postJSON("/api/login", credentials);
  },
  async menu(query) {
    return await fetchJSON("/api/menu?" + new URLSearchParams(query));
  },
  async addItem(item) {
    return await postJSON("/api/menu/add", item);
  },
});
