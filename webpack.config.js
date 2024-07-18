import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.tsx',
    mode: isDevelopment ? 'development' : 'production',
    output: {
      filename: '[name].[contenthash].js', 
      chunkFilename: '[name].[contenthash].js', 
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        path: 'path-browserify',
        os: 'os-browserify/browser',
        crypto: 'crypto-browserify',
        buffer: 'buffer',
        stream: 'stream-browserify',
        vm: 'vm-browserify',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isDevelopment ? 'development' : 'production',
        ),
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all', 
      },
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      open: true,
      historyApiFallback: true,
      hot: true
    },
  };
};
