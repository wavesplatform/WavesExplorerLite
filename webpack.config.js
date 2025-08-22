const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const buildPath = path.join(__dirname, 'dist');
const sourcesPath = path.join(__dirname, 'src');
const scriptsPath = path.join(sourcesPath, 'js');
const basePath = process.env.BASE_PATH || '/'

var config = {
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "vm": require.resolve("vm-browserify"),
            "stream": require.resolve("stream-browserify")
        }
    },
    entry: {
        main: path.join(scriptsPath, 'index.js')
    },
    output: {
        filename: '[name].[hash:16].js',
        path: buildPath,
        publicPath: basePath
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: []
                }
            }
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]', // fonts folder in dist
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash].[ext]',
                }
            }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(sourcesPath, 'index.html'),
            filename: './index.html',
            base: basePath
        }),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(require('./package.json').version),
        }),
        new LodashModuleReplacementPlugin({
            shorthands: true
        }),
        new webpack.ids.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(sourcesPath, 'favicon.png'),
                to: buildPath
            }, {
                from: 'manifest.json',
                to: buildPath
            },
                // {
                //     from: path.join(sourcesPath, 'config.js'),
                //     to: buildPath
                // }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                },
            },
        },
    },
};

const networks = {
    mainnet: ['mainnet', 'testnet', 'stagenet'],
    stagenet: ['mainnet', 'testnet', 'stagenet'],
    testnet: ['mainnet', 'testnet', 'stagenet'],
    devnet: ['devnet'],
    custom: [],
};

module.exports = (env, argv) => {
    let googleTrackingId;
    let amplitudeApiKey;
    let sentryDsn;
    if (argv.mode === 'development') {
        config.devtool = 'source-map';

        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        }));

        googleTrackingId = 'UA-75283398-17';
        amplitudeApiKey = '0b3481b4cb40d949738933a57eaeb4fe';
        sentryDsn = 'https://1b5911ae5b1849b9b114809877eb6d84@sentry.io/1401737';
    }

    if (argv.mode === 'production') {
        config.output.filename = '[name].[chunkhash].js';

        googleTrackingId = 'UA-75283398-13';
        amplitudeApiKey = 'e15743e3459050165886afc936f1a08e';
        sentryDsn = 'https://9ee88f8e9ec741d5897e64c89a38e4f6@sentry.io/1401739';
    }

    const network = (env && env.network) || 'mainnet';
    const decompileUrl = (env && env.decompileUrl) || 'https://testnode1.wavesnodes.com/utils/script/decompile';
    const networkConfiguration = networks[network] || [];
    config.plugins.push(new webpack.DefinePlugin({
        __NETWORKS__: JSON.stringify(networkConfiguration),
        __GOOGLE_TRACKING_ID__: JSON.stringify(googleTrackingId),
        __AMPLITUDE_API_KEY__: JSON.stringify(amplitudeApiKey),
        __SENTRY_DSN__: JSON.stringify(sentryDsn),
        __DECOMPILE_SCRIPT_URL__: JSON.stringify(decompileUrl),
        __BASE_PATH__: JSON.stringify(basePath)
    }));

    return config;
};
