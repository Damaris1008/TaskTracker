import express from "express";
import {create} from "express-handlebars";

import indexRoutes from "./routes/index.routes";
import userRoutes from "./routes/users.routes";
import cardRoutes from "./routes/cards.routes";

import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import bodyParser from "body-parser";

const app = express();
require('./database');
require('./config/passport');

app.set("views", path.join(__dirname, "views"));

const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout:'main',

    // Helpers
    helpers: {
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
  });
  
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash("error");
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(indexRoutes);
app.use(cardRoutes);
app.use(userRoutes);

export default app;
