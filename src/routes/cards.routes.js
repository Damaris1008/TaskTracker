import { Router } from "express";
import Card from "../models/Card";

const router = Router();

router.post("/cards/add", async (req, res) => {
    const card = Card(req.body);
    //const savedCard = await card.save();
    console.log(card);
    res.send("Card added");
});

export default router;