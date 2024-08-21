import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js'
import authRoutes from './router/auth.router.js'
import movieRoutes from './router/movie.router.js'
import tvRoutes from './router/tv.router.js'
import {protectRoute} from './middlewares/protectRoute.js'
import cookieParser from "cookie-parser";
import searchRoutes from './router/search.router.js'

dotenv.config();

const app = express();

app.use(express.json()); // will allow to parse the req body.
app.use(cookieParser()); 

app.use("/api/v1/auth",protectRoute, authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);

const PORT = ENV_VARS.PORT
    
app.listen(PORT,()=>{
    console.log("server running at http://localhost:"+ PORT)
    connectDB();
});


//TttOIdwDHXv2R39s