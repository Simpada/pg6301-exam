import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const RestaurantApiContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async login(credentials) {
    return await postJSON("/api/login", credentials);
  },
  async logout() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
  async menu(query) {
    return await fetchJSON("/api/menu?" + new URLSearchParams(query));
  },
  async addItem(item) {
    return await postJSON("/api/menu/add", item);
  },
});
