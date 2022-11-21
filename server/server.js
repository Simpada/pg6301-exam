import express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { RestaurantApi } from "./restaurantApi.js";
import bodyParser from "body-parser";
import { LoginApi } from "./loginApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);

mongoClient.connect().then(async () => {
  app.use(
    "/api/menu",
    RestaurantApi(
      mongoClient.db(process.env.MONGODB_DATABASE || "api_and_webdesign")
    )
  );
});

app.use("/api/login", LoginApi());
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
