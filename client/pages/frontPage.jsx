import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useLoading } from "../useLoading";
import { LoginLinks } from "./login";
import { RestaurantApiContext } from "../restaurantApiContext";

export function FrontPage() {
  const { fetchLogin } = useContext(RestaurantApiContext);
  const { logout } = useContext(RestaurantApiContext);
  const { loading, error, data, reload } = useLoading(
    async () => await fetchLogin()
  );
  const user = data;

  console.log(user);

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

      <div>
        {user ? (
          <div>
            {user.fullName} ({user.username})
            <button
              onClick={async () => {
                await logout();
                await reload();
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
