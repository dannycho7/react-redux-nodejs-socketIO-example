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

	socket.on("poll", (t) => {
		console.log(`Received ${t}`);
		interval.push(setInterval(() => getApiAndEmit(socket), 5000));
		console.log("Added new poll to interval array");
	});

	socket.on("stop", () => {
		console.log("Stopped polling for new weather");
		clearInterval(interval[0]);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval[0]);
	});
});

const getApiAndEmit = socket => {
	axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/43.7695,11.2558`)
	.then((res) => {
		console.log("Sent back new temperature update", res.data.currently.temperature);
		socket.emit("FromAPI", res.data.currently.temperature);
	});
};

server.listen(5000, () => console.log("Server listening in on port 5000"));