import type { NextFunction, RequestHandler, Response } from "express";
import { ApiError } from "./apiError.js";
import type { AuthRequest } from "../middleware/isAuth.js";

export const TryCatch = (
  controller: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => 
  async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch(error: any) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      }
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }