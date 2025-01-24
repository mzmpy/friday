import React, { useState, useEffect } from "react";

import "./index.css";

const MDXEditorPage: React.FC = () => {
  const [compiled, setCompiled] = useState<string>();

  useEffect(() => {
    window.utils.compileMDX().then((res) => {
      console.log("=== compile mdx ===", JSON.parse(res));
      const json = JSON.parse(res) as CompileResult;
      setCompiled(json.outputFiles[0].text)
    });
  });

  return (
    <div className="--editor-content-vessel">{compiled}</div>
  );
}

export default MDXEditorPage;