import { Router } from "express";
import flash from "connect-flash";
import User from '../models/User';
import bcrypt from "bcryptjs/dist/bcrypt";

const passport = require('passport');
const router = Router();
const jwt = require("jsonwebtoken");

// APP 

router.get("/users/signin", (req, res) => {
    res.render('users/signin');
});

router.post("/users/signin", passport.authenticate('local', {
    successRedirect: '/cards',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get("/users/signup", (req, res) => {
    res.render('users/signup');
});

router.post("/users/signup", async (req, res) => {
    const {name, email, password, confirm_password}  = req.body;
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: 'Por favor, inserte un nombre'});
    }
    if(email.length <= 0) {
        errors.push({text: 'Por favor, inserte un correo electrónico'});
    }
    if(password.length <= 0) {
        errors.push({text: 'Por favor, inserte una contraseña'});
    }
    if(confirm_password.length <= 0) {
        errors.push({text: 'Por favor, inserte la confirmación de contraseña'});
    }
    if(password != confirm_password) {
        errors.push({text: "Las contraseñas no coinciden"});
    }
    if(password.length < 4 && password.length > 0) {
        errors.push({text: "La contraseña debe tener al menos 4 caracteres"});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', "El correo electrónico ya está en uso");
            return res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', "Registro realizado correctamente");
        res.redirect('/users/signin');

    }
});

router.get("/users/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});


// API

router.post("/api/users/signin", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Debes introducir tu email y contraseña");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
        );
        res.status(200).json({email, accessToken});
    }else {
        res.status(401);
        throw new Error("Email o contraseña incorrecto");
    }
}

);

router.post("/api/users/signup", async (req, res) => {
    const {name, email, password, confirm_password}  = req.body;
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: 'Por favor, inserte un nombre'});
    }
    if(email.length <= 0) {
        errors.push({text: 'Por favor, inserte un correo electrónico'});
    }
    if(password.length <= 0) {
        errors.push({text: 'Por favor, inserte una contraseña'});
    }
    if(confirm_password.length <= 0) {
        errors.push({text: 'Por favor, inserte la confirmación de contraseña'});
    }
    if(password != confirm_password) {
        errors.push({text: "Las contraseñas no coinciden"});
    }
    if(password.length < 4 && password.length > 0) {
        errors.push({text: "La contraseña debe tener al menos 4 caracteres"});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            return res.status(400).json({ message:"El correo electrónico ya está en uso" });
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.status(201).json(newUser);

    }
});

router.get("/api/users/logout", function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message:"Sesión cerrada correctamente" });
    });
});

export default router;