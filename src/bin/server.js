require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = require("../app");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("New client connection");
	let interval = [];

	socket.on("message", (message_info) => {
		console.log("Received a message");
		socket.broadcast.emit("message", message_info);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(5000, () => console.log("Server listening in on port 5000"));