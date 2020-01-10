var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var env = process.env.NODE_ENV;

module.exports = {
    context: __dirname,
    mode: env,
    entry: './static/src/main.js',

    output: {
        filename: "[name]-[hash].js",
        path: path.resolve('./static/webpack_bundles/'),
        publicPath: path.resolve('/static/webpack_bundles/') + '/',
    },

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true,
        contentBase: path.resolve('/static/'),
        hot: true,
        writeToDisk: true,
        proxy: {
            '!/static/webpack_bundles/**': {
                target: 'http://django-sns-vue:8000', // points to django dev server
                changeOrigin: true,
            },
        },
        watchOptions: {
            poll: true
        },
    },

    plugins: [
        new BundleTracker({ filename: 'webpack-stats.json' }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            "node_modules"
        ],
        alias: {
            'vue': path.resolve('./node_modules/vue/dist/vue.js'),
        }
    },
}
