const passport = require("passport"),
LocalStrategy = require("passport-local").Strategy,
User = require("../models/User");

/* passport setup */
passport.use("signup", new LocalStrategy(function(username, password, done) {
	User.create({
		username,
		password
	}, (err, user) => {
		console.log("Created user", user);
		return done(err, user);
	});
}));

passport.use("login", new LocalStrategy(function(username, password, done) {
	User.findOne({
		username,
		password
	}, (err, user) => {
		console.log("Found user", user);
		return done(err, user);
	})
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, (err, user) => {
		done(null, user);
	});
});

module.exports = passport;
