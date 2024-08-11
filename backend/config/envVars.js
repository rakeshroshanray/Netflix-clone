import dotenv from 'dotenv';

dotenv.config();

//console.log(process.env.PORT)

export const ENV_VARS = {

    MONGO_URI : process.env.MONGO_URI,
    
    PORT :  process.env.PORT || 5000
    
}