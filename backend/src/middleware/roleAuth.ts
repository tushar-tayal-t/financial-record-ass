import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./isAuth.js";

export type Role = "USER" | "ADMIN";

export const authorizeRoles = (...allowedRoles: Role[]) => {
  return async(req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(400).json({
        success: false,
        message: "Please login to access the resource"
      });
    } 
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied"
      });
    }
    next();
  }
}