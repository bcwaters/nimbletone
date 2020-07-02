const path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
            },
            {
            test: /\.css$/,
            loader:'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ],
    },
  plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ],
  
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    entry: {
        app: './src/index.js',
    },

};