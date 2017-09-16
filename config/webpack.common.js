var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

module.exports = {
    entry: {
        'polyfills': './demo/polyfills.ts',
        'vendor': './demo/vendor.ts',
        'app': './demo/boot.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: helpers.root('demo/index.html'),
                loader: 'html-loader'
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //     loader: 'file-loader?name=assets/[name].[hash].[ext]',
            //     include: helpers.root('demo', 'res'),
            // },
            {
                test: /\.css$/,
                exclude: [helpers.root('demo'), helpers.root('src')],
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: [helpers.root('demo'), helpers.root('src')],
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            // /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./demo'), // location of your src
            {} // a map of your routes
        ),

        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV)
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: `demo/index.html`,
            environment: {
                ENV: ENV
            }
        }),

        new CopyWebpackPlugin([{
            from: "demo/res/**/*"
        }, {
            from: 'demo/favicon.ico',
            to: 'favicon.ico'
        }])
    ]
};
