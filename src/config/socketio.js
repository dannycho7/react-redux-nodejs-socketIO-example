const socketIo = require("socket.io"),
cookieParser = require("cookie-parser"),
passportSocketIo = require("passport.socketio"),
Message = require("../models/Message");

module.exports = (server, sessionStore) => {
	const io = socketIo(server);

	io.use(passportSocketIo.authorize({
		cookieParser: cookieParser,
		key: "chat.sid",
		secret: "this can be whatever you want",
		store: sessionStore,
		fail: (data, message, error, accept) => { accept(null, !error); }
	}));

	io.on("connection", socket => {
		console.log("New client connection from user is logged in:", socket.request.user.logged_in);

		socket.on("user", user => {
			console.log("Received", user);
		});

		socket.on("room", (room) => {
			console.log(`Client from socket ${socket.id} joined room ${room}`);
			socket.join(room);
			Message.find({
				room
			}, (err, messages) => socket.emit("fetch-" + room, messages))
		});
		socket.on("leave", (room) => socket.leave(room));

		socket.on("message", (message_info) => {
			const { room, content, timestamp } = message_info;
			console.log("Received a message", room);
			Message.create({
				content,
				room,
				user: socket.request.user.logged_in ? socket.request.user.username : "guest-" + socket.id,
				timestamp
			}, (err, message) => {
				if(err) throw err;
				console.log("Message saved:", message);
				socket.broadcast.to(room).emit("message", message);
			});
		});

		socket.on("disconnect", () => console.log("Client disconnected"));
	});
}
