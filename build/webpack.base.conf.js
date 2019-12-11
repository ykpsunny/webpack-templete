const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const WebpackBar = require('webpackbar')

const HappyPack = require('happypack')

const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
	entry: {
		index: path.join(__dirname, '../src'),
		vendors: ['react', 'react-dom']
	},
	output: {
		path: path.join(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				use: ['HappyPack/loader?id=js'],
				exclude: /node_modules/
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'static/fonts/name]-[[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|webp)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							name: 'static/imgs/[name]-[hash:8].[ext]',
							fallback: 'file-loader'
						}
					}
				]
			},
			{
				test: /\.(svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/public/index.html')
		}),
		new WebpackBar({ color: 'cyan' }),
		new HappyPack({
			id: 'js',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool,
			verbose: true
		})
	],
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx', '.json']
	}
};