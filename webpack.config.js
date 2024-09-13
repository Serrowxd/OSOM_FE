const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	devServer: {
		static: './dist',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'], // Tailwind CSS
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './public/index.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};