const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, { useMongoClient: true })
.then(() => console.log("Connected to mongo db client:", process.env.DB_URL));