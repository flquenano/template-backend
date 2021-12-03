class AppError extends Error {
  constructor(message, httpCode, description) {
    super(message);
    this.httpCode = httpCode;
    this.description = description;
    this.status = `${httpCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const httpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};
module.exports = {
  AppError: AppError,
  httpCode: httpCodes
};
