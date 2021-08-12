import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';
const __dirname = path.resolve();

export default merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname + '/dist'),
    index: 'index.html',
    port: 9000,
    writeToDisk: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
