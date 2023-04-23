import { Router } from "express";
import Card from "../models/Card";

const router = Router();

// Get all cards
router.get("/cards", async (req,  res) => {
    const cards = await Card.find().sort({createdAt: 'desc'}).lean();
    console.log(cards);
    res.render("cards/all-cards", { cards });
});

// Get form for adding a card
router.get("/cards/add", (req, res) => {
    res.render("cards/new-card");
});

// Post a new card
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
        req.flash("success_msg", "Tarjeta agregada correctamente");
        res.redirect("/cards");
    }
});

// Get form for updating a card
router.get("/cards/edit/:id", async (req, res) => {
    const card = await Card.findById(req.params.id).lean();
    const id = req.params.id;
    const { title, description, status } = card;
    res.render("cards/edit-card", { id, title, description, status });
});

// Update a card
router.put("/cards/edit/:id", async (req, res) => {
    var { title, description, status } = req.body;
    const id = req.params.id;
    const errors = [];
    if (!title) {
        errors.push({ text: "Debe introducir un título" });
    }
    if (!status) {
        errors.push({ text: "Debe asignar un estado" });
    }
    if (errors.length > 0) {
        res.render("cards/edit-card", {
            errors,
            id,
            title,
            description,
            status
        });
    } else {
        await Card.findByIdAndUpdate(req.params.id, { title, description, status });
        req.flash("success_msg", "Tarjeta actualizada correctamente");
        res.redirect("/cards");
    }
});

// Delete a card
router.delete("/cards/delete/:id", async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Tarjeta eliminada correctamente");
    res.redirect("/cards");
});


export default router;