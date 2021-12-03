const morgan = require("morgan");
const Logger = require("../lib/winston");

const stream = {
  write: (message) => Logger.http(message)
};

const morganMiddleware = morgan(
  "\nmethod: :method \nendpoint: :url \nstatus: :status \nresponse-time: :response-time ms",
  {
    stream
  }
);

module.exports = morganMiddleware;
