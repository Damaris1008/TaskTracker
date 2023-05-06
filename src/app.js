const express = require("express");
const {create} = require("express-handlebars");

const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/users.routes");
const cardRoutes = require("./routes/cards.routes");

const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const bodyParser = require("body-parser");

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
  res.locals.user = req.user || null;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(indexRoutes);
app.use(cardRoutes);
app.use(userRoutes);

module.exports = app;
