import type { Plugin } from "esbuild";

export default (): Plugin => {
  return {
    name: "import-to-cdn",
    setup(build) {
      build.onResolve({ filter: /(^[\w@][^?:]*)(\?=cdn)$/, namespace: "VFS" }, (args) => {
        return {
          external: true,
          path: `https://esm.sh/${args.path}`,
          namespace: "IMPORT_TO_CDN"
        };
      });

      build.onResolve({ filter: /^@mdx-js\/react/, namespace: "VFS" }, (args) => {
        return {
          external: true,
          path: `https://esm.sh/${args.path}`,
          namespace: "IMPORT_TO_CDN"
        };
      });
    }
  }
};
