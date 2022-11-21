import {Router} from "express";

export function LoginApi() {
    const router = new Router();

    const users = [
        {
            username: "admin",
            fullName: "Mr Admin",
            password: "admin",
        },
    ];

    router.get("/", (req, res) => {
        function respond() {
            if (req.user) {
                const {username, fullName} = req.user;
                return res.json({username, fullName});
            } else {
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
       const {username, password} = req.body;
       const user = users.find(
           (u)=> u.username === username && u.password === password
       );
       if (user) {
           res.cookie("username", user.username, {signed: true});
           res.sendStatus(200);
       } else {
           res.sendStatus(401);
       }
    });

    return router;
}