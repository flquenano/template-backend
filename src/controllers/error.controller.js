const Logger = require("../lib/winston");

const send_error_development = (err, req, res) => {
  const { httpCode, status, message, description, stack, ...others } = err;

  Logger.error(
    `\npayload: ${JSON.stringify(req.body, null, 2)}\nmessage: ${
      description || message
    }\nstack-trace:\n${stack}`
  );
  res.status(httpCode).json({
    message: description || message,
    status: status,
    stack: stack
  });
};

module.exports = (err, req, res, next) => {
  err.httpCode = err.httpCode || 500;
  err.status = err.status || "error";
  send_error_development(err, req, res);
};
