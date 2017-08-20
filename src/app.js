const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "static/index.html"));
});

app.post("/signup", (req, res) => {
	console.log("request received");
	res.json({
		text: "Nice! you got a response"
	});
});

module.exports = app;