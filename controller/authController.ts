import {Request, Response } from "express"
import bcrypt from "bcrypt"
import cloudinary from "../config/cloudinary"
import authModel from "../model/authModel";

export const createUser = async(req: Request, res: Response )=> {
    try {
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const { public_id, secure_url } = await cloudinary.uploader.upload(
            req.file?.path!,
          );

          const user = authModel.create({
            email, 
            password: hash,
            // userName,
            avatar: secure_url,
            avatarID: public_id,
          });

          return res.status(201).json({
            message: "user created",
            data: user,
          });
      
    } catch (error){
        return res.status(404).json({
            message: "unable to create user"
        })

    }
}