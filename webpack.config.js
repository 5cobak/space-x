const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: 'style-loader',
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];
  const eslintLoader = {
    loader: 'eslint-loader',
  };
  if (isDev) {
    loaders.push(eslintLoader);
  }
  return loaders;
};

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      template: `${PATHS.src}/pages/index/index.html`,
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    // patterns: [{ from: `${PATHS.src}/pages/index/img`, to: 'assets/img' }],
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      linkType: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.scss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/img',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(),
      },
    ],
  },
};
