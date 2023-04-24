import { Router } from "express";
import flash from "connect-flash";
import User from '../models/User';

const passport = require('passport');
const router = Router();

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
    var {name, email, password, confirm_password}  = req.body;
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
            res.redirect('/users/signup');
        }
        var newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', "Registro realizado correctamente");
        res.redirect('/users/signin');
        
    }
});

export default router;