const path = require("path");

module.exports = {
	devtool: "eval-source-map",
	mode: "development",
	entry: {
		game: "./src/index.ts",
		toolspritesheet: "./src/pge_engine/tools/spritesheet/spritesheet.ts",
		exampletilemap: "./src/examples/tilemap/indextilemap.ts",
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				include: [path.resolve(__dirname, "src")],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	devServer: {
		publicPath: "/",
		contentBase: "./public",
		hot: true,
	},
	output: {
		publicPath: "public",
		filename: "[name].js",
		path: path.resolve(__dirname, "public"),
	},
};
