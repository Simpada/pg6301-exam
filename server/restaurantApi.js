import {Router} from "express";


export function RestaurantApi(mongoDatabase) {

    const router = new Router();

    router.get("/", async (req, res) => {
        const items = await mongoDatabase.collection("exam_menu")
            .find({
                price: {
                    $gte: 0,
                }
            })
            .map(({name, ingredients, price}) => ({
                name,
                ingredients,
                price
            }))
            .toArray()
        res.json(items);
    });


    return router;
}