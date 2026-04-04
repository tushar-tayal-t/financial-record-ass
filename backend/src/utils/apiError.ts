export class ApiError extends Error {
  statusCode: number;
  constructor(code: number, msg: string) {
    super(msg);
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }
}