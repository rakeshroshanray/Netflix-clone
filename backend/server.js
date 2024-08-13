// import express from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js'
import authRoutes from './router/auth.router.js'

dotenv.config();

const app = express();

app.use(express.json()); // will allow to parse the req body.

app.use("/api/v1/auth", authRoutes)

const PORT = ENV_VARS.PORT
    
app.listen(PORT,()=>{
    console.log("server running at http://localhost:"+ PORT)
    connectDB();
});

//TttOIdwDHXv2R39s