import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.js";
import { User, type IUser } from "../modules/auth/auth.model.js";

export interface AuthRequest extends Request{
  user?: IUser;
}

export const isAuth = async(req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Please login - No auth header"
      });
      return;
    }
  
    const token = authHeader.split(" ")[1] || "";
    const decodedValue = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
  
    if (!decodedValue || !decodedValue.id) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }
  
    const user = await User.findById(decodedValue.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    
    req.user = user;
    next();
  } catch(error: any) {
    res.status(401).json({
      success: false,
      message: "Please login -JWT error",
    });
  }
}