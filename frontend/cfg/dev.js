/**
 * Created by albertoclarit on 12/27/15.
 */

var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var publicPath = 'http://localhost:8000/assets/';

var baseConfig = require('./base');

var config = _.merge({
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'app.js',
        publicPath: publicPath
    },
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8000',
        'webpack/hot/only-dev-server',
        './src/containers/run'
    ],
    debug: true,
    cache: true,
    devtool: 'eval',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel-loader',
    exclude: /(node_modules|bower_components)/
   /* ,
    include: [
        path.join(__dirname, '/../src'),
        path.join(__dirname, '/../node_modules/joi/')
    ]*/
});

module.exports = config;
