'use strict';
var path = require('path'),
    webpack = require('webpack');
module.exports = {
    cache: true,
    entry: {
        main: path.resolve(__dirname, 'source', 'js', 'main.js')
    },
    output: {
        path: path.resolve(__dirname, 'develop'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    resolve: {
        alias: {
            'data': path.resolve(__dirname, 'source', 'js', 'data'),
            'main': path.resolve(__dirname, 'source', 'js', 'main'),
            'views': path.resolve(__dirname, 'source', 'js', 'views'),
            'app': path.resolve(__dirname, 'source', 'js', 'app'),
            'scope': path.resolve(__dirname, 'source', 'js', 'scope'),
            'templates': path.resolve(__dirname, 'source', 'templates')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        loaders: [
            { test: require.resolve("jquery"), loader: "expose-loader?jQuery" },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [path.resolve(__dirname, 'source', 'js', 'helpers')],
                    partialDirs: [path.resolve(__dirname, 'source', 'templates')],
                    precompileOptions: {
                        knownHelpersOnly: false
                    }
                }
            }
        ]
    }
};
