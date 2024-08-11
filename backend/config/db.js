import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async() =>{

    try{
        console.log(ENV_VARS.MONGO_URI)
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB connected: " + conn.connection.host)

    }
    catch(error){
        console.log("error connecting to DB :")
        // process.exit(1);
    }
}