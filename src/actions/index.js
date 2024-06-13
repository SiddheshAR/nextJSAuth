"use server"

import connectToDB from "@/database"
import User from "@/models";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

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

export async function loginUserAction(formData){
    try{
        await connectToDB();
        const {email,password} = formData;
        const userData = await User.findOne({email});
        if(!userData){
            return{
                success:false,
                message:"Email id is not registered"
            }
        } 
        const checkPassword = await bcryptjs.compare(password,userData.password);
        if(!checkPassword){
            return{
                success:false,
                message:"Password is incorect please check."
            }
        }  
        const createTokenData ={
            id: userData._id,
            userName : userData.userName,
            email : userData.email
        } 

        const token = jwt.sign(createTokenData, "DEFAULT_KEY",
            {
                expiresIn:"1d"
            }
         );
         const getCookies = cookies();
         getCookies.set('token',token);
         return {
            success:true,
            message:"Login Succesfully."
         }
    }catch(error){
        console.log(error)
        return{
            success:false,
            message:"Something went wrong."
        }
    }
}

export async function fetchAuthUserAction(){
    await connectToDB();
    try{
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, 'DEFAULT_KEY');
        const getUserInfo = await User.findOne({_id:decodedToken.id});
        if(getUserInfo){
           return{
                success:true,
                data:JSON.parse(JSON.stringify(getUserInfo))
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
            message:"Something went wrong."
        }
    }
}

export async function logOutUser(){
    const getCookies =cookies();
    getCookies.set("token","");
}
