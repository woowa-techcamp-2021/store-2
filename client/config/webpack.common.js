import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();

export default {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '*': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: '> 1%, not dead',
                  useBuiltIns: 'usage',
                  corejs: { version: '3.16' },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
        exclude: /(node_modules)/,
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(ico|png|jpe?g|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
