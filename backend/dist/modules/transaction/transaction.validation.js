import { z } from "zod";
const transactionSchema = z.object({
    amount: z.preprocess((val) => Number(val), z.number().positive({ message: "Amount must be a positive number" })),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1, "Category is required"),
    note: z.string().optional(),
});
const updateTransSchema = z.object({
    amount: z.preprocess((val) => Number(val), z.number().positive({ message: "Amount must be a positive number" }).optional()),
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    category: z.string().min(1, "Category is required").optional(),
    note: z.string().optional(),
    createdAt: z.preprocess((val) => {
        if (val === undefined || val === null)
            return undefined;
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date;
    }, z.date().optional())
});
export const validateCreateTransaction = (req, res, next) => {
    try {
        const validation = transactionSchema.safeParse(req.body);
        if (!validation.success) {
            const zodError = validation.error;
            let firstErrorMessage = "Validation failed";
            let allErrors = [];
            if (zodError.issues && Array.isArray(zodError.issues)) {
                allErrors = zodError.issues.map((issue) => ({
                    field: issue.path ? issue.path.join(".") : "unknown",
                    message: issue.message || "Validation error",
                    code: issue.code
                }));
                firstErrorMessage = allErrors[0]?.message || firstErrorMessage;
            }
            return res.status(400).json({
                success: false,
                name: firstErrorMessage,
                message: allErrors
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Zod validation failed",
        });
    }
};
export const validateUpdateTransaction = (req, res, next) => {
    try {
        const validation = updateTransSchema.safeParse(req.body);
        if (!validation.success) {
            const zodError = validation.error;
            let firstErrorMessage = "Validation failed";
            let allErrors = [];
            if (zodError.issues && Array.isArray(zodError.issues)) {
                allErrors = zodError.issues.map((issue) => ({
                    field: issue.path ? issue.path.join(".") : "unknown",
                    message: issue.message || "Validation error",
                    code: issue.code
                }));
                firstErrorMessage = allErrors[0]?.message || firstErrorMessage;
            }
            return res.status(400).json({
                success: false,
                name: firstErrorMessage,
                message: allErrors
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Zod validation failed",
        });
    }
};
