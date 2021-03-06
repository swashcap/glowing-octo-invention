const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isEnvProd = process.env.NODE_ENV === 'production'

const getStyleLoaders = () => {
  if (isEnvProd) {
    return [
      // https://webpack.js.org/plugins/mini-css-extract-plugin/
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !isEnvProd
        }
      },
      {
        loader: 'css-loader',
        options: {
          modules: false
        }
      },
      'postcss-loader'
    ]
  }

  return ['style-loader', 'css-loader', 'postcss-loader']
}

module.exports = {
  devServer: {
    contentBase: './ui/src/',
    port: 3000,
    publicPath: '/assets/'
  },
  devtool: 'source-map',
  entry: {
    main: './ui/src/index.tsx'
  },
  mode: isEnvProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders()
      },
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(__dirname, 'ui/tsconfig.json')
            }
          }
        ]
      },
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      }
    ]
  },
  output: {
    chunkFilename: isEnvProd ? '[id].[chunkhash].chunk.js' : '[id].chunk.js',
    filename: isEnvProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'ui/src/index.html')
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isEnvProd
        ? '[id].[chunkhash].chunk.css'
        : '[id].chunk.css',
      filename: isEnvProd
        ? '[name].[chunkhash].bundle.css'
        : '[name].bundle.css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}
