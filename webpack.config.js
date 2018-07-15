const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

var config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                }
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }, {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
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