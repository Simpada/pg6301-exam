import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import { LoginApi } from "../loginApi.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/login", LoginApi());

describe("Login Api", () => {
  it("gets user without a req user", async () => {
    await request(app).get("/api/login").expect(204);
  });

  it("login for user", async () => {
    await request(app)
      .post("/api/login")
      .send({
        username: "admin",
        password: "admin",
        skip: true,
      })
      .expect(200);
  });

  it("tests crashes on encountering cookie", async () => {
    await request(app)
      .post("/api/login")
      .send({
        username: "admin",
        password: "admin",
      })
      .expect(500);
  });

  it("cannot login with wrong credentials", async () => {
    await request(app)
      .post("/api/login")
      .send({
        username: "notUser",
        password: "notUser",
      })
      .expect(401);
  });

  it("deletes cookie", async () => {
    await request(app).delete("/api/login").expect(200);
  });
});
