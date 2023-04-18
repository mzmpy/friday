declare module "*.svg" {
  import * as React from "react"

  const SVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  export default SVGComponent
}