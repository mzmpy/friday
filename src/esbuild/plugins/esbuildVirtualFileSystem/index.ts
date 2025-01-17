import path from "path";
import type { Plugin } from "esbuild";
import { createFormatAwareProcessors } from "@mdx-js/mdx/internal-create-format-aware-processors";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default (options: VFileOptions): Plugin => {
  return {
    name: "virtual-file-system",
    setup(build) {
      build.onResolve({ filter: /\.js$/ }, (args) => {
        const importPath = path.resolve(args.resolveDir, args.path);
        console.log("=== esbuild plugin [vfs resolve] ===", args, importPath);

        return {
          path: importPath,
          namespace: "VFS",
          pluginData: {
            resolveDir: args.resolveDir
          }
        };
      });

      build.onLoad({ filter: /\.js$/, namespace: "VFS" }, (args) => {
        console.log("=== esbuild plugin [vfs load] ===", args);

        const findFile = (fsTree: any[]) => {
          let res: any;
          for(const fd of fsTree) {
            if(fd.absPath === args.path) res = fd.ctx;
            else if(fd.ctx instanceof Array) {
              res = findFile(fd.ctx);
            }
          }

          return res;
        };

        return {
          contents: findFile(options.fsTree),
          loader: "jsx",
          resolveDir: args.pluginData.resolveDir
        }
      });

      build.onResolve({ filter: /\.mdx$/ }, (args) => {
        const importPath = path.resolve(args.resolveDir, args.path);
        console.log("=== esbuild plugin [vfs resolve] ===", args);

        return {
          path: importPath,
          namespace: "VFS",
          pluginData: {
            resolveDir: args.resolveDir
          }
        };
      });

      build.onLoad({ filter: /\.mdx$/, namespace: "VFS" }, async (args) => {
        const findFile = (fsTree: any[]) => {
          let res: any;
          for(const fd of fsTree) {
            console.log("=== find file ===", fd.absPath, args.path, fd.absPath === args.path);
            if(fd.absPath === args.path) res = fd.ctx;
            else if(fd.ctx instanceof Array) {
              res = findFile(fd.ctx);
            }
          }

          return res;
        };
        const {extnames, process} = createFormatAwareProcessors({
          remarkPlugins: [remarkGfm, remarkMath],
        });
        const file = await process(findFile(options.fsTree));
        console.log("=== esbuild plugin [vfs resolve] ===", file, extnames);

        return {
          contents: file.value,
          resolveDir: args.pluginData.resolveDir,
          loader: "jsx"
        }
      });
    },
  };
};
