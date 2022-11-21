import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useLoading } from "../useLoading";
import { LoginLinks } from "./login";
import { RestaurantApiContext } from "../restaurantApiContext";
import { fetchJSON } from "../lib/fetchJSON";

export function FrontPage() {
  const { fetchLogin } = useContext(RestaurantApiContext);
  const { loading, error, data, reload } = useLoading(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div>
      <h1>The API and Web-design Restaurant</h1>
      <ul>
        <li>
          <Link to={"/menu"}>View Menu</Link>
        </li>
        <li>
          <Link to={"/menu/add"}>Add an Item to The Menu</Link>
        </li>
      </ul>

      <div>
        {user ? (
          <div>
            {user.fullName} ({user.username})
            <button
              onClick={async () => {
                await fetch("/api/login", {
                  method: "delete",
                });
                reload();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <LoginLinks />
        )}
      </div>
    </div>
  );
}
