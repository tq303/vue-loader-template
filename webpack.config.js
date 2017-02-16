const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      'vue': 'vue/dist/vue.common.js',
      'downloadjs': 'downloadjs/download.min.js',
      'font-awesome': 'font-awesome/scss/font-awesome.scss',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: ['./src'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css:     generateLoaders(['css-loader']),
            postcss: generateLoaders(['css-loader']),
            sass:    generateLoaders(['css-loader', 'sass-loader?indentedSyntax']),
            scss:    generateLoaders(['css-loader', 'sass-loader']),
            js: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['/src'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // fonts
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=./fonts/[name].[ext]"
      },
      // font-awesome
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff&name=./fonts/[name].[ext]"
      },
    ]
  },
};

function generateLoaders(loaders) {

  const sourceLoader = loaders.map((loader) => {
    return `${loader}?sourceMap`;
  }).join('!')

  return ['vue-style-loader', sourceLoader].join('!')
}