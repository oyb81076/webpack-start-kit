import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, ProgressPlugin, HotModuleReplacementPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const config: Configuration = {
  entry: `${__dirname}/src/index.ts`,
  mode: 'development',
  devServer: {
    contentBase: [`${__dirname}/public`],
    watchContentBase: true,
    hot: true,
    hotOnly: true,
    port: 3000,
    open: 'Google Chrome',
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'static/bundle.js',
    path: `${__dirname}/build`,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      inject: true,
      filename: 'index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: `${__dirname}/tsconfig.json`,
      },
    }),
    new ESLintPlugin({
      files: ['src/**/*.ts'],
    }),
    new ProgressPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(bmp|gif|jpeg|jpg|png|ico)$/,
        loader: 'file-loader',
        options: { name: 'static/images/[name].[hash:8].[ext]' },
      },
      {
        test: /.html$/,
        exclude: [/\/public\//],
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env', { targets: { browsers: 'last 1 Chrome versions' } }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
    ],
  },
};

export = config;
