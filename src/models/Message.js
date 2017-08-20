const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Message = mongoose.model("Message", {
	user: String,
	content: String,
	timestamp: String,
	room: String
});

module.exports = Message;
