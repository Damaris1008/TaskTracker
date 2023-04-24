import mongoose from 'mongoose';
import app from './app';
import './database';
import './config/passport';

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server on port ", 3000));
