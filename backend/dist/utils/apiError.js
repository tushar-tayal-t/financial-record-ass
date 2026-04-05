export class ApiError extends Error {
    statusCode;
    constructor(code, msg) {
        super(msg);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
