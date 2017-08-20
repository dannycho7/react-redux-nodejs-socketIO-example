const express = require("express"),
path = require("path"),
bodyParser = require("body-parser"),
session = require("express-session"),
MongoStore = require("connect-mongo")(session),
passport = require("passport"),
LocalStrategy = require("passport-local").Strategy;

const app = express();
const sessionStore = new MongoStore({
	url: "mongodb://localhost/react-redux-socketIO-app"
});

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	key: "chat.sid",
	store: sessionStore,
	secret: "this can be whatever you want",
	resave: false,
	saveUninitialized: false
}));

/* passport setup */
passport.use("signup", new LocalStrategy(function(username, password, done){
	return done(null, username);
}));

passport.use("login", new LocalStrategy(function(username, password, done){
	return done(null, username);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "static/index.html"));
});

app.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		req.logIn(user, (err) => {
			console.log(`Logged in user: ${user} with error: ${err}`);
			res.json({ user });
		});
	})(req, res, next);
});

app.post("/signup", (req, res, next) => {
	passport.authenticate("signup", (err, user, info) => {
		res.json({ user });
	})(req, res, next);
});

module.exports.default = app;
module.exports.sessionStore = sessionStore;
