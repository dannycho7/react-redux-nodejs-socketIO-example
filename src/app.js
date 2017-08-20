const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "static/index.html"));
});

app.post("/login", (req, res) => {
	res.json({
		user: req.body.username
	});
});

app.post("/signup", (req, res) => {
	console.log("request received", req.body);
	console.log(req.headers);
	res.json({
		user: req.body.username
	});
});

module.exports = app;