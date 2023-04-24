import { Router } from "express";
import Card from "../models/Card";

const router = Router();
const { isAuthenticated } = require('../helpers/auth');

//APP

// Get all cards
router.get("/cards", isAuthenticated, async (req,  res) => {
    const cards = await Card.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render("cards/all-cards", { cards });
});

// Get form for adding a card
router.get("/cards/add", isAuthenticated, (req, res) => {
    res.render("cards/new-card");
});

// Post a new card
router.post("/cards/add", isAuthenticated, async (req, res) => {

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
    if (!status || (status != "Por hacer" && status != "En curso" && status != "Terminado")) {
        errors.push({ text: "El estado debe ser \"Por hacer\", \"En curso\" o \"Terminado\"."});
    }
    if (priority && priority != "Baja" && priority != "Media" && priority != "Alta") {
        errors.push({ text: "La prioridad debe ser baja, media o alta."});
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
        newCard.user = req.user.id;
        await newCard.save();
        req.flash("success_msg", "Tarea agregada correctamente.");
        res.redirect("/cards");
    }
});

// Get form for updating a card
router.get("/cards/edit/:id", isAuthenticated, async (req, res) => {
    const card = await Card.findById(req.params.id).lean();
    const id = req.params.id;
    const { title, description, status, priority } = card;
    res.render("cards/edit-card", { id, title, description, status, priority });
});

// Update a card
router.put("/cards/edit/:id", isAuthenticated, async (req, res) => {
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
    if (!status || (status != "Por hacer" && status != "En curso" && status != "Terminado")) {
        errors.push({ text: "El estado debe ser \"Por hacer\", \"En curso\" o \"Terminado\"."});
    }
    if (priority && priority != "Baja" && priority != "Media" && priority != "Alta") {
        errors.push({ text: "La prioridad debe ser baja, media o alta."});
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
        req.flash("success_msg", "Tarea actualizada correctamente.");
        res.redirect("/cards");
    }
});

// Delete a card
router.delete("/cards/delete/:id", isAuthenticated, async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Tarea eliminada correctamente.");
    res.redirect("/cards");
});

// API

// Get all cards
router.get("/api/cards", isAuthenticated, async (req,  res) => {
    const cards = await Card.find().sort({createdAt: 'desc'}).lean();
    res.status(200).json(cards);
});


// Post a new card

router.post("/api/cards/add", isAuthenticated, async (req, res) => {
    var { title, description, status, priority } = req.body;

    const errors = [];
    if(priority==""){
        priority=null;
    }
    if(status==""){
        status=null;
    }
    if (!title) {
        errors.push({ error: "Debe introducir un título." });
    }
    if (!status || (status != "Por hacer" && status != "En curso" && status != "Terminado")) {
        errors.push({ error: "El estado debe ser \"Por hacer\", \"En curso\" o \"Terminado\"."});
    }
    if (priority && priority != "Baja" && priority != "Media" && priority != "Alta") {
        errors.push({ error: "La prioridad debe ser baja, media o alta."});
    }

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        const newCard = new Card({ title, description, status, priority });
        await newCard.save();
        res.status(201).json(newCard);
    }

});

// Update a card

router.put("/api/cards/edit/:id", isAuthenticated, async (req, res) => {
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
        errors.push({ error: "Debe introducir un título." });
    }
    if (!status || (status != "Por hacer" && status != "En curso" && status != "Terminado")) {
        errors.push({ error: "El estado debe ser \"Por hacer\", \"En curso\" o \"Terminado\"."});
    }
    if (priority && priority != "Baja" && priority != "Media" && priority != "Alta") {
        errors.push({ error: "La prioridad debe ser baja, media o alta."});
    }

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, { title, description, status, priority });
        res.status(201).json(updatedCard);
    }
});

// Delete a card
router.delete("/api/cards/delete/:id", isAuthenticated, async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message:"Tarea eliminada correctamente" })
});

export default router;