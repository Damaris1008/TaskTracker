import { Router } from "express";
import Card from "../models/Card";

const router = Router();

// Get all cards
router.get("/cards", async (req,  res) => {
    const cards = await Card.find().sort({createdAt: 'desc'}).lean();
    res.render("cards/all-cards", { cards });
});

// Get form for adding a card
router.get("/cards/add", (req, res) => {
    res.render("cards/new-card");
});

// Post a new card
router.post("/cards/add", async (req, res) => {

    var { title, description, status, priority } = req.body;
    const errors = [];
    if(priority==""){
        priority=null;
    }
    if(status==""){
        status=null;
    }
    if (!title) {
        errors.push({ text: "Debe introducir un título." });
    }
    if (!status || (status != "Por hacer" && status != "En progreso" && status != "Terminado")) {
        errors.push({ text: "Debe asignar uno de los tres estados posibles."});
    }

    if (errors.length > 0) {
        res.render("cards/new-card", {
            errors,
            title,
            description,
            status,
            priority
        });
    } else {
        const newCard = new Card({ title, description, status, priority });
        await newCard.save();
        req.flash("success_msg", "Tarjeta agregada correctamente.");
        res.redirect("/cards");
    }
});

// Get form for updating a card
router.get("/cards/edit/:id", async (req, res) => {
    const card = await Card.findById(req.params.id).lean();
    const id = req.params.id;
    const { title, description, status, priority } = card;
    res.render("cards/edit-card", { id, title, description, status, priority });
});

// Update a card
router.put("/cards/edit/:id", async (req, res) => {
    var { title, description, status, priority } = req.body;
    const id = req.params.id;
    const errors = [];
    if(status==""){
        status=null;
    }
    if(priority==""){
        priority=null;
    }
    if (!title) {
        errors.push({ text: "Debe introducir un título." });
    }
    if (!status || (status != "Por hacer" && status != "En progreso" && status != "Terminado")) {
        errors.push({ text: "Debe asignar uno de los tres estados posibles." });
    }

    if (errors.length > 0) {
        console.log(status);
        res.render("cards/edit-card", {
            errors,
            id,
            title,
            description,
            status, 
            priority
        });
    } else {

        await Card.findByIdAndUpdate(req.params.id, { title, description, status, priority });
        req.flash("success_msg", "Tarjeta actualizada correctamente.");
        res.redirect("/cards");
    }
});

// Delete a card
router.delete("/cards/delete/:id", async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Tarjeta eliminada correctamente.");
    res.redirect("/cards");
});


export default router;