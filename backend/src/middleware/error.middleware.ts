import type { NextFunction, Request, Response } from "express";

export const ErrorHandlerMiddleware = (
  err: any, 
  _req: Request, 
  res: Response, 
  _next: NextFunction) => {
    console.log(err);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
      timestamp: new Date()
    });
}