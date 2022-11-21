import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useLoading } from "../useLoading";
import { RestaurantApiContext } from "../restaurantApiContext";

export function FrontPage() {
  const { fetchLogin } = useContext(RestaurantApiContext);
  const { loading, error, data } = useLoading(async () => await fetchLogin());
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  let admin = false;
  if (user !== null) {
    if (user.isAdmin) {
      admin = true;
    }
  }

  return (
    <div>
      <h1>The API and Web-design Restaurant</h1>
      <ul>
        <li>
          <Link to={"/menu"}>View Menu</Link>
        </li>
        {admin ? (
          <li>
            <Link to={"/menu/add"}>Add an Item to The Menu</Link>
          </li>
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
