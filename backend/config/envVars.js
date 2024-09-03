import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {

    MONGO_URI : process.env.MONGO_URI,
    PORT :  process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    CLIENT_URL: process.env.CLIENT_URL || (() => { throw new Error("Missing CLIENT_URL in environment"); })(),
}