const mongoose = require('mongoose');
const app = require('./app');
require('./database');
require('./config/passport');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server on port ", 3000));
