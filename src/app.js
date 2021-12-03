const express = require("express");
const app = express();

const cors = require("cors");
const ErrorHandler = require("./controllers/error.controller");
const Logger = require("./lib/winston");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://sip-client-portal.mybluemix.net", // dev client
    "https://sip-provider-portal.mybluemix.net", // dev provider
    "https://mywayfinder-uat.us-east.mybluemix.net", // uat client
    "https://mywayfinder-provider-uat.us-east.mybluemix.net" // uat provider
  ],
  credentials: true
};

app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
// app.use(bodyParser.json({ limit: "15mb", extended: true }));
app.use(express.json({ limit: "15mb", extended: true }));

app.use("/static", express.static("public"));
app.get("/logger", (_, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");
  res.status(400).json({ test: "Test" });
  // res.send("Hello world");
});
app.use("/v1/api", require("./routes"));

app.all("*", (req, res) => {
  res.status(404).send(`Can't Find ${req.originalUrl} on this server`);
});

app.use(ErrorHandler);

module.exports = app;
