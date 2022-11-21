import { Router } from "express";
import cookieParser from "cookie-parser";

export function LoginApi() {
  const router = new Router();

  router.use(cookieParser(process.env.COOKIE_SECRET));

  const users = [
    {
      username: "admin",
      fullName: "Mr Admin",
      password: "admin",
    },
  ];

  router.use((req, res, next) => {
    const { username } = req.signedCookies;
    req.user = users.find((u) => u.username === username);
    next();
  });

  router.get("/", async (req, res) => {
    function respond() {
      if (req.user) {
        const { username, fullName } = req.user;
        console.log("Im here");
        return res.json({ username, fullName });
      } else {
        console.log("Im crashing");
        res.sendStatus(204);
      }
    }
    setTimeout(respond, 400);
  });

  router.delete("/", (req, res) => {
    res.clearCookie("username");
    res.sendStatus(200);
  });

  router.post("/", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      res.cookie("username", user.username, { signed: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
