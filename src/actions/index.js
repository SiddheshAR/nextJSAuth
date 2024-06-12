"use server"

import connectToDB from "@/database"
import User from "@/models";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function registerUserAction(formData){
    try{    
         await connectToDB();
         const {userName,email,password} = formData
         const checkUser =await User.findOne({email});

         if(checkUser){
            return{
            success:false,
            message:"User already Exists"}
         }


         const salt = await bcryptjs.genSalt(10);


         const hashedPassword = await bcryptjs.hash(password, salt);
         const newlyCreatedUser = new User({
            userName,
            email,
            password:hashedPassword,
         })


         let savedData = await newlyCreatedUser.save();
         if(savedData){
            return{
                success:true,
                data:JSON.parse(JSON.stringify(savedData))
            }
         }else{
            return{
                success:false,
                message:"Something went wrong."
            }   
         }
    }catch(error){
        return{
            success:false,
            message:"Someting went wrong."
        }
    }
}