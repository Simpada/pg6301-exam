import { Router } from "express";

export function RestaurantApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const query = {
      price: { $gte: 0 },
    };
    const { category } = req.query;
    if (category) {
      query.category = { $in: [category] };
    }
    const { price } = req.query;
    if (price) {
      query.price = { $gte: parseInt(price) };
    }

    const items = await mongoDatabase
      .collection("exam_menu")
      .find(query)
      .map(({ name, ingredients, price, category }) => ({
        name,
        ingredients,
        price,
        category,
      }))
      .toArray();
    res.json(items);
  });

  router.post("/add", (req, res) => {
    const { name, ingredients, price, category } = req.body;
    mongoDatabase
      .collection("exam_menu")
      .insertOne({ name, ingredients, price, category });
    res.sendStatus(200);
  });

  return router;
}
