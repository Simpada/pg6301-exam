import * as dotenv from "dotenv";
import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { RestaurantApi } from "../restaurantApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
const mongoClient = new MongoClient(process.env.MONGODB_URL);

beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("exam_test_db");
  await database.collection("menu").deleteMany({});
  app.use("/api/menu", RestaurantApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("Restaurant Api", () => {
  it("adds and gets item", async () => {
    await request(app)
      .post("/api/menu/add")
      .send({
        name: "test dish",
        ingredients: ["test", "dish"],
        price: 9000,
        category: "fake",
      })
      .expect(200);
    expect(
      (await request(app).get("/api/menu").expect(200)).body.map(
        ({ name }) => name
      )
    ).toContain("test dish");
  });

  it("shows filtered items by category", async () => {
    await request(app)
      .post("/api/menu/add")
      .send({
        name: "test dish",
        ingredients: ["test", "dish"],
        price: 9000,
        category: "fake",
      })
      .expect(200);

    await request(app)
      .post("/api/menu/add")
      .send({
        name: "other",
        ingredients: ["test", "dish"],
        price: 200,
        category: "boring",
      })
      .expect(200);

    expect(
      (await request(app).get("/api/menu?category=fake").expect(200)).body.map(
        ({ name }) => name
      )
    ).toContain("test dish");
    expect(
      (await request(app).get("/api/menu?category=fake").expect(200)).body.map(
        ({ name }) => name
      )
    ).not.toContain("other");
  });
});
