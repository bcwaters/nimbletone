const path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
            },
            {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            },
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