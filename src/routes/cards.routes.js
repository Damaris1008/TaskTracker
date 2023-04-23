import { Router } from "express";
import Card from "../models/Card";

const router = Router();

router.get("/cards", async (req,  res) => {
    const cards = await Card.find().sort({createdAt: 'desc'}).lean();
    console.log(cards);
    res.render("cards/all-cards", { cards });
});

router.get("/cards/add", (req, res) => {
    res.render("cards/new-card");
});

router.post("/cards/add", async (req, res) => {

    const { title, description, status } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Debe introducir un título" });
    }
    if (!status) {
        errors.push({ text: "Debe asignar un estado" });
    }
    if (errors.length > 0) {
        res.render("cards/new-card", {
            errors,
            title,
            description,
            status
        });
    } else {
        const newCard = new Card({ title, description, status });
        await newCard.save();
        res.redirect("/cards");
    }
});




export default router;