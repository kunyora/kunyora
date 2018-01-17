/**
 * Created by kayslay on 6/28/17.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./src/index.js'],
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dists/',
        filename: 'composer-client.js'
    },
    devtool: "source-map"
};