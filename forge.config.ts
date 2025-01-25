import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import fs from "fs";
import path from "path";

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  hooks: {
    postStart: async (forgeConfig) => {
      const webpackPlugin = forgeConfig.plugins.find((plugin) => plugin.name === "webpack") as WebpackPlugin;
      
      if(webpackPlugin) {
        const mainConfig = await webpackPlugin.configGenerator.getMainConfig();
        const baseDir = mainConfig.output?.path;

        if(baseDir) {
          const fp = path.resolve(baseDir, "node_modules/@esbuild/darwin-arm64/bin/esbuild");
          fs.chmodSync(`${fp}`, 0o755);
        }
      }
    },
    postPackage: async (forgeConfig, options) => {
      options.outputPaths.forEach((fp) => {
        const resolvedPath = path.resolve(
          fp,
          "friday.app/Contents/Resources/app/.webpack/main",
          "node_modules/@esbuild/darwin-arm64/bin/esbuild"
        );
        fs.chmodSync(`${resolvedPath}`, 0o755);
      });
    }
  },
  packagerConfig: {},
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      devContentSecurityPolicy: "media-src * blob:",
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
