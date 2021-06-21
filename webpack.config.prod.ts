import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: Configuration = {
  entry: `${__dirname}/src/index.ts`,
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/bundle.[contenthash].js',
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
    new MiniCssExtractPlugin({
      filename: 'static/bundle.[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: `${__dirname}/tsconfig.json`,
      },
    }),
    new ESLintPlugin({
      files: ['src/**/*.ts'],
      emitError: true,
    }),
    new ProgressPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `${__dirname}/build/analyzer.html`,
    }),
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
                [
                  '@babel/preset-env',
                  { targets: { browsers: ['> 1%', 'not ie 11', 'ios >= 11'] } },
                ],
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
