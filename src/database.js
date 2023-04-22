import { connect } from "mongoose";
require("dotenv").config();



(async () => {
    try{
        const db = await connect(process.env.MONGODB_URI)
        console.log("DB connected to", db.connection.name);
    }catch(error){
        console.log(error);
    }
})();
