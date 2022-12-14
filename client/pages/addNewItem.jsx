import React, { useContext, useState } from "react";
import { RestaurantApiContext } from "../restaurantApiContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../useLoading";
import { error } from "console";

export function AddNewItem(ignoreCookie) {
  const { addItem } = useContext(RestaurantApiContext);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    addItem({
      name,
      ingredients: ingredients.split(" "),
      price: parseInt(price),
      category,
    });
    navigate("/");
  }

  const { fetchLogin } = useContext(RestaurantApiContext);
  const { data } = useLoading(async () => await fetchLogin());
  const user = data;

  if (
    ignoreCookie === null ||
    ignoreCookie === undefined ||
    ignoreCookie === false
  ) {
    if (user === null || user === undefined) {
      error(ignoreCookie);
      navigate("/");
    } else if (!user.isAdmin) {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1> Add new Item to The Menu </h1>

      <div className="form-input">
        <label>
          <strong>Dish Name</strong>{" "}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div className="form-input">
        <label>
          <strong>Ingredients</strong>{" "}
          <input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          Separate the ingredients by spaces
        </label>
      </div>
      <div className="form-input">
        <label>
          <strong>Price</strong>{" "}
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </div>
      <div className="form-input">
        <label>
          <strong>Category</strong>{" "}
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
