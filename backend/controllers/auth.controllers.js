import { User } from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import nodemailer from 'nodemailer';
 import jwt from 'jsonwebtoken';

export async function signup(req,res){
    try{
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            res.status(400).json({success : false, message :"All fields are required"})
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if(!emailRegex.test(email)){
            res.status(400).json({success : false, message : "Invalid Email"})
        }
        
        if(password.length < 6){
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
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image
           
        })

        generateTokenAndSetCookie(newUser._id,res)
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
        console.log("Error in signUp controller", error.message);
        res.status(500).json({ success: false , message : "Internal Server Error"})
    }
}

export async function login(req,res){
   try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success : false, message :"All fields are required"});
        }

        const user = await User.findOne({email:email});
        if(!user){
            res.status(404).json({success:false, message:"Invalid Credentials"});
        }

        const isPasswordMatch = await bcryptjs.compare(password,user.password);
        if(!isPasswordMatch){
            res.status(404).json({success:false, message:"Invalid Credentials"});
        }

        generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            success : true,
            user: {
                ...user._doc,
                password : "",
            }

        });

   }
   catch(error){
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false , message : "Internal Server Error"})
   }
}

export async function logout(req,res){
   try{
    res.clearCookie("jwt-netflix");
    res.status(200).json({success : true, mesasage: "Loged out successfully"})

   }
   catch(error){
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false , message : "Internal Server Error"})
   }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

/// Forgot Password function
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User with this email does not exist" });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true, // true for 465, false for other ports
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Link',
            text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Password reset link sent successfully" });

    } catch (error) {
        console.error("Error in forgotPassword controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Reset Password function
export async function resetPassword(req, res) {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (!password || password.length < 6) {
            return res.status(400).json({ success: false, message: "Password length must be at least 6" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.status(200).json({ success: true, message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword controller", error.message);
        res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
}