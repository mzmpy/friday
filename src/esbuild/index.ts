import esbuild from "esbuild";
import esbuildMDX from "@mdx-js/esbuild";

import esbuildVirtualFileSystem from "@/esbuild/plugins/esbuildVirtualFileSystem";

export const useMDX = async () => {
  return await esbuild.build({
    stdin: {
      contents: `import Demo from "./demo/index.mdx";\nconsole.log(Demo);`,
      resolveDir: "/vfs",
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
      esbuildVirtualFileSystem({
        fsTree: [
          {
            name: "index.mdx",
            resolveDir: "/vfs/demo",
            absPath: "/vfs/demo/index.mdx",
            isDir: false,
            isFile: true,
            ctx: `# Last year’s snowfall`
          }
        ]
      }),
      esbuildMDX({
        providerImportSource: '@mdx-js/react'
      })
    ],
    metafile: true
  });
};
