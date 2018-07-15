const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const buildPath = path.join(__dirname, 'dist');

var config = {
    resolve: {
        extensions: ['.js']
    },
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom'
        ]
    },
    output: {
        library: '[name]_[hash]',
        libraryTarget: 'var',
        filename: '[name].[hash].js',
        path: buildPath
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(buildPath, '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
}