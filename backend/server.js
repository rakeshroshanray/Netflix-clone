import express from 'express';
import authRoutes from './router/auth.router.js'
import { Config } from './config/envVars.js';
import dotenv from "dotenv"

dotenv.config()
const app = express();

const port =process.env.PORT || 8000


app.use('/api/v1/auth', authRoutes);

    console.log(process.env.PORT)
app.listen(port,()=>{
    console.log("xcvbnm,.;'")
});

//TttOIdwDHXv2R39s