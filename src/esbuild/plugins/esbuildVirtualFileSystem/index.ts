import path from "path";
import type { Plugin } from "esbuild";
import { createFormatAwareProcessors } from "@mdx-js/mdx/internal-create-format-aware-processors";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { VFile } from "vfile";

export default (options: VFileOptions): Plugin => {
  return {
    name: "virtual-file-system",
    setup(build) {
      build.onResolve({ filter: /\.jsx?$/ }, (args) => {
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

      build.onLoad({ filter: /\.jsx?$/, namespace: "VFS" }, (args) => {
        const vf = findFile(options.files, args.path);
        console.log("=== esbuild plugin [vfs load] ===", args, vf);

        if(!vf) return;

        return {
          contents: vf.value,
          loader: path.extname(args.path).slice(1) as "js"|"jsx",
          resolveDir: args.pluginData.resolveDir
        }
      });

      build.onResolve({ filter: /\.mdx$/ }, (args) => {
        const importPath = path.resolve(args.resolveDir, args.path);
        console.log("=== esbuild plugin [vfs mdx resolve] ===", args);

        return {
          path: importPath,
          namespace: "VFS",
          pluginData: {
            resolveDir: args.resolveDir
          }
        };
      });

      build.onLoad({ filter: /\.mdx$/, namespace: "VFS" }, async (args) => {
        const {extnames, process} = createFormatAwareProcessors({
          jsxImportSource: "@mdx-js/react",
          remarkPlugins: [remarkGfm, remarkMath],
        });
        const vf = findFile(options.files, args.path);
        if(!vf) return;

        const compiled = await process(vf.value);
        console.log("=== esbuild plugin [vfs mdx load] ===", vf, compiled);

        return {
          contents: compiled.value,
          resolveDir: args.pluginData.resolveDir,
          loader: "js"
        }
      });
    },
  };
};

const findFile = (fileList: VFile[], _path: string): VFile|undefined => {
  for(const fd of fileList) {
    if(fd.path === _path) return fd;
  }

  return;
};
