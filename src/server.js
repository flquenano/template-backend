const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const port = process.env.PORT || 3000;

// Initializing server
const server = require("http").createServer(app);

server.listen(port, () =>
  console.log(`Server is up and running on port ${port}!`)
);
