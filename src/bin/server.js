require("dotenv").config();

const http = require("http");

const { sessionStore, default: app } = require("../app");

const server = http.createServer(app);

require("../config/socketio")(server, sessionStore);

server.listen(5000, () => console.log("Server listening in on port 5000"));