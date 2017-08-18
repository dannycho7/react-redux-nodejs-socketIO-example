require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");

const app = require("../app");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("New client connection");

	socket.on("room", (room) => {
		console.log(`Client from socket ${socket.id} joined room ${room}`);
		socket.join(room);
	});
	socket.on("leave", (room) => socket.leave(room));

	socket.on("message", (message_info) => {
		const { room } = message_info;
		console.log("Received a message", room);
		if(room) socket.broadcast.to(room).emit("message", message_info);
	});

	socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(5000, () => console.log("Server listening in on port 5000"));