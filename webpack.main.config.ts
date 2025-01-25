import type { Configuration } from "webpack";
import { default as CopyPlugin } from "copy-webpack-plugin";
import path from "path";

import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@component": path.resolve(__dirname, "src/components")
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./stardict.db", to: "./stardict.db" },
        { from: "./src/assets/favicon.png", to: "./assets/favicon.png" },
        { from: "./src/assets/faviconTemplate.png", to: "./assets/faviconTemplate.png" },
        { from: "node_modules/esbuild/**/*", to: "./" },
        { from: "node_modules/@esbuild/**/*", to: "./" }
      ]
    })
  ],
  // without "nock", "mock-aws-s3", "aws-sdk" as externals will cause error when make
  externals: ["nock", "mock-aws-s3", "aws-sdk", "esbuild", "@esbuild"]
};
