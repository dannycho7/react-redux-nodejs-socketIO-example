const path = require("path");

module.exports = {
	entry: [
		path.join(__dirname, "src/client/index.js")
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ["es2015", "react"]
			}
		}]
	},
	devtool: "source-map",
	output: {
		path: path.join(__dirname, "src/static"),
		filename: "bundle.js"
	}
};