import type { NextFunction, Request, Response } from "express";
import {z} from "zod";

const registerSchema = z.object({
  name: z.string().min(3, {message: "Name must 3 characters long"}),
  email: z.string().check(z.email({message: "Please enter valid email"})),
  password: z.string().min(8, {message: "Password must have atleast 8 characters"}),
});

const loginSchema = z.object({
  email: z.string().check(z.email({message: "Invalid credentials"})),
  password: z.string().min(8, {message: "Invalid credentials"}),
});

export const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      const zodError = validation.error;
      let firstErrorMessage = "Validation failed";
      let allErrors: any[] = [];
      if (zodError.issues && Array.isArray(zodError.issues)) {
        allErrors = zodError.issues.map((issue) => ({
          field: issue.path ? issue.path.join(".") : "unknown",
          message: issue.message || "Validation error",
          code: issue.code
        }));
        firstErrorMessage = allErrors[0]?.message || firstErrorMessage
      }
      return res.status(400).json({
        success: false,
        name: firstErrorMessage,
        message: allErrors
      });
    }

    next();
  } catch(error: any) {
    res.status(400).json({
      success: false,
      message: "Zod validation failed",
    });
  }
}

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      const zodError = validation.error;
      let firstErrorMessage = "Validation failed";
      let allErrors: any[] = [];
      if (zodError.issues && Array.isArray(zodError.issues)) {
        allErrors = zodError.issues.map((issue) => ({
          field: issue.path ? issue.path.join(".") : "unknown",
          message: issue.message || "Validation error",
          code: issue.code
        }));
        firstErrorMessage = allErrors[0]?.message || firstErrorMessage
      }
      return res.status(400).json({
        success: false,
        name: firstErrorMessage,
        message: allErrors
      });
    }

    next();
  } catch(error: any) {
    res.status(400).json({
      success: false,
      message: "Zod validation failed",
    });
  }
}