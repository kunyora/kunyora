/**
 * Created by kayslay on 6/28/17.
 */
const path = require('path');
const webpack = require('webpack');

const common = {
	entry: {
		index: ['./src/index.js'],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {warnings: false}
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader'],
			exclude: '/node_modules/'
		}]
	},
	devtool: "source-map"
};

const frontEnd = {
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dists/',
		filename: 'composer-client.js',
	},
};

const backEnd = {
	output: {
		path: path.join(__dirname,"/"),
		publicPath: '/dists/',
		filename: 'index.js',
		libraryTarget: "commonjs2"
	},
	target: "node"
}

module.exports = [
	Object.assign({},common,frontEnd),
	Object.assign({},common,backEnd)
];