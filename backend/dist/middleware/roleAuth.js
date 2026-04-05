export const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
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
    };
};
