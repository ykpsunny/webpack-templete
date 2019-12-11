const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
	mode: 'production',
	plugins: [new CleanWebpackPlugin()],
	output: {
		filename: 'public/js/[name]-[hash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css|less)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require('autoprefixer')]
						}
					},
					{
						loader: 'sass-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css',
			chunkFilename: 'css/[id].[chunkhash:8].css'
		}),
		new UglifyJsPlugin({
			sourceMap: true,
			exclude: /node_modules/,
			uglifyOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
					warnings: false
				},
				comments: false
			}
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minChunks: 1,
			minSize: 0,
			cacheGroups: {
				framework: {
					test: 'vendors',
					name: 'vendors',
					enforce: true
				},
				styles: {
					name: 'styles',
					test: /\.(scss|css|sass)$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	}
});
