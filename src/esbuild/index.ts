import esbuild from "esbuild";
import { VFile } from "vfile";
import path from "path";

import esbuildVirtualFileSystem from "@/esbuild/plugins/esbuildVirtualFileSystem";
import esbuildImport from "@/esbuild/plugins/esbuildImport";

const fsFlatTree = [
  new VFile({
    cwd: __dirname,
    path: path.resolve(__dirname, "vfs/index.mdx"),
    value: `export const val = 43;\n\n# Last year’s snowfall`
  })
];

export const useMDX = async () => {
  return await esbuild.build({
    stdin: {
      contents: `import { default as __Context__, val } from "./index.mdx";\nconsole.log(val, __Context__);`,
      resolveDir: path.resolve(__dirname, "vfs"),
      sourcefile: "index.jsx",
      loader: "jsx"
    },
    write: false,
    bundle: true,
    format: "esm",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    external: ["react", "react-dom"],
    platform: "browser",
    target: "esnext",
    loader: {
      '.jsx': 'jsx'
    },
    plugins: [
      esbuildImport(),
      esbuildVirtualFileSystem({
        files: fsFlatTree
      })
    ],
    metafile: true
  });
};
