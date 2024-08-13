import { User } from "../model/user.model.js"

export async function signup(req,res){
    try{
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            res.status(400).json({success : false, message :"All fields are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            res.staus(400).json({success : false, message : "Invalid Email"})
        }

        if(password.length() < 6){
            res.status(400).json({success : false, message : "Password length must be at least 6"})
        }

        const existingUserByEmail = await User.findOne({email : email})
        if(existingUserByEmail){
            res.status(400).json({success : false, message : "User with Email already exist"})
        }

        const existingUserByUsername = await User.findOne({username : username})
        if(existingUserByUsername){
            res.status(400).json({success : false, message : "User with Username already exist"})
        }

        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"]

        const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length())]

        const newUser = new User({
            email : "email",
            username : "username",
            password : "password",
            image : "image"
        })

        await newUser.save()

        res.status(201).json({
            success : true,
            user: {
                ...newUser._doc,
                password : "",
            }

        });
        
    }
    catch (error){
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function login(req,res){
    res.send("login Routes")
}

export async function logout(req,res){
    res.send("logout Routes")
}