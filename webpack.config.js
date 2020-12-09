const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const PATH = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
}

//defining mode (i -D cross-env   and    set in package.json)
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]
    if (isDev) loaders.push('eslint-loader')
    return loaders
}

module.exports = {
    context: PATH.src,
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: PATH.dist
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
        extensions: ['.js'],
        // ../../../../src/core -> @core
        alias: {
            '@': PATH.src,
            '@core': PATH.src + '/core'
        }
    },
    devServer: {
        port: 9000,
        open: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: PATH.src + '/favicon.ico',
                    to: PATH.dist
                },
            ],
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Compressed CSS
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ],
    },
}