var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  context: __dirname,
  output: {
      path: path.resolve('./assets/webpack_bundles/'),
      filename: "[name]-[hash].js",
      publicPath: path.resolve('/'),
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    contentBase: path.resolve('/assets/'),
    //contentBase: path.resolve('./assets/webpack_bundles/'),
    //contentBase: __dirname + "/dist/",
    //contentBase: __dirname + "/dist/",
    hot: true,
    writeToDisk: true,
    proxy: {
      //'!/static/webpack_bundles/**': {
      //'**': {
        //'!/assets/webpack_bundles/': {
        '!/assets/webpack_bundles/**': {
        target: 'http://django:8000', // points to django dev server
        changeOrigin: true,
      },
    },
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': path.resolve('./node_modules/vue/dist/vue.js'),
      'vue$': 'vue/dist/vue.common.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
}
