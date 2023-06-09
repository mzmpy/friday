import type { Configuration } from 'webpack';
import { default as CopyPlugin } from "copy-webpack-plugin";

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./stardict.db", to: "./stardict.db" },
        { from: "./src/assets/favicon.png", to: "./assets/favicon.png" }
      ]
    })
  ],
  // without 'nock', 'mock-aws-s3', 'aws-sdk' as externals will cause error when make
  externals: ['nock', 'mock-aws-s3', 'aws-sdk']
};
