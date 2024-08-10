import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT)

export const Config = {

    MONGO_URI : process.env.MONGO_URI,
    
    PORT :  process.env.PORT || 5000
    
}