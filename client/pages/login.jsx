import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { RestaurantApiContext } from "../restaurantApiContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(RestaurantApiContext);

  async function handleSubmit(e) {
    e.preventDefault();
    await login({ username, password });
    navigate("/");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please log in</h1>
      <div>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
      <pre>{JSON.stringify({ username, password }, undefined, "  ")}</pre>
    </form>
  );
}
