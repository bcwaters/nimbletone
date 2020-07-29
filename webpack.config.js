const path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            },
        ],
    },
  plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
          new Dotenv()
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