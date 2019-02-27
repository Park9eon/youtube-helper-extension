'use strict';

/**
 * Created by park9eon on 2019-01-03
 */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
module.exports = (env, argv) => ({
    mode: 'development',
    entry: {
        browser_action: './src/browser_action',
        css_provider: './src/css_provider',
        pip: './src/pip',
    },
    output: {
        path: distPath,
        filename: '[name].js',
    },
    devtool: argv.mode === 'development' ? 'source-map' : '',
    plugins: [new CopyWebpackPlugin([{from: './assets'}]), new CleanWebpackPlugin([distPath])],
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'babel-loader',
        }],
    },
});
