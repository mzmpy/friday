declare module "*.svg" {
  import * as React from "react";

  const SVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  export default SVGComponent
}

declare module "@mdx-js/mdx/internal-create-format-aware-processors" {
  export * from "@mdx-js/mdx/lib/util/create-format-aware-processors"
}
