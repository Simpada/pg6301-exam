import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { Menu } from "./pages/menu";
import { AddNewItem } from "./pages/addNewItem";
import React, { useContext } from "react";
import { Login } from "./pages/login";
import { RestaurantApiContext } from "./restaurantApiContext";
import { useLoading } from "./useLoading";

export function Application() {
  const { fetchLogin } = useContext(RestaurantApiContext);
  const { logout } = useContext(RestaurantApiContext);
  const { data, reload } = useLoading(async () => await fetchLogin());
  const user = data;

  return (
    <BrowserRouter>
      <header>
        <div>
          <Link to={"/"}>Front page</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/menu"}>Menu</Link>
        </div>
        <div>
          {user ? (
            <>
              {user.fullName} ({user.username})
              <button
                onClick={async () => {
                  await logout();
                  await reload();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/*<Link to={"/menu"}>Menu</Link>*/}
            </>
          )}
        </div>
        <div className="menu-divider" />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/menu"} element={<Menu />} />
          <Route path={"/menu/add"} element={<AddNewItem />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
