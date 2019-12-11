const merge = require('webpack-merge')

const path = require('path')

const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	devServer: {
		open: true,
		port: 3000,
		contentBase: path.join(__dirname, '../src/public'),
		hot: true,
		progress: true,
		inline: true,
		quiet: true
	},
	resolve: {
		alias: {
			PUBLIC: path.join(__dirname, '../src/public'),
			COMPONENTS: path.join(__dirname, '../src/components'),
			ROOT: path.join(__dirname, '/')
		}
	}
});
