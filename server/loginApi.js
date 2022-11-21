import {Router} from "express";

export function LoginApi() {
    const router = new Router();

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

    router.delete("/api/login", (req, res) => {
        res.clearCookie("username");
        res.sendStatus(200);
    });



    return router;
}