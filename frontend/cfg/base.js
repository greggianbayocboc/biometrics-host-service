/**
 * Created by albertoclarit on 12/27/15.
 */
var path = require('path');
var port = 8000;
var publicPath = '/assets/';

module.exports = {
    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: port,
        publicPath: publicPath,
        noInfo: false,
        proxy: {
            "/api*":"http://localhost:8080",
            "/sld*":"http://localhost:8080",
            "/images*":"http://localhost:8080",
            "/restapi*":"http://localhost:8080",
            "/fa*":"http://localhost:8080"
        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }

        ]
    },
    node: {
        dns: 'mock',
        net: 'mock'
    }
};

/* {
 test: /\.(png|jpg|gif|woff|woff2|ttf)$/,
 loader: 'url-loader?limit=8192'
 },
 { test: /\.(woff2(\?\S*)|svg)?$/, loader: 'url?limit=10000' },
 { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' }

/*
 { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
 { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' }
 */
