require("dotenv").config();

const http = require("http"),
socketIo = require("socket.io"),
cookieParser = require("cookie-parser"),
passportSocketIo = require("passport.socketio");

const { sessionStore, default: app } = require("../app");

const server = http.createServer(app);
const io = socketIo(server);

io.use(passportSocketIo.authorize({
	cookieParser: cookieParser,
	key: "chat.sid",
	secret: "this can be whatever you want",
	store: sessionStore,
	fail: (data, message, error, accept) => { accept(null, !error); }
}));

io.on("connection", socket => {
	console.log("New client connection from user is logged in:", socket.request.user.logged_in === undefined ? true : false);

	socket.on("user", user => {
		console.log("Received", user);
	});

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