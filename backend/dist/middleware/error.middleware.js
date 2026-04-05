export const ErrorHandlerMiddleware = (err, _req, res, _next) => {
    console.log(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
        timestamp: new Date()
    });
};
