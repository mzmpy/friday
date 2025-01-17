import React from "react";

import "./index.css";

const MDXEditorPage: React.FC = () => {
  window.utils.compileMDX().then((res) => {
    console.log("=== compile mdx ===", JSON.parse(res));
  });

  return (
    <div className="--editor-content-vessel"></div>
  );
}

export default MDXEditorPage;