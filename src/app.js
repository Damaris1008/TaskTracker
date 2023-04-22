import express from "express";
import {create} from "express-handlebars";

import indexRoutes from "./routes/index.routes";
import userRoutes from "./routes/users.routes";
import cardRoutes from "./routes/cards.routes";

import path from "path";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";

const app = express();

app.set("views", path.join(__dirname, "views"));

const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout:'main'
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

// Routes
app.use(indexRoutes);
app.use(cardRoutes);
app.use(userRoutes);

export default app;
