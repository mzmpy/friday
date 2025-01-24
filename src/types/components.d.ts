import type { VFile } from "vfile";
import type { BuildResult } from "esbuild";

declare module "@components/DictContent" {
  interface LocationState {
    word: Word;
  }
}

declare module "@components/DictSider" {
  interface Iprops {
    search: string;
    collapsed: boolean;
    onPressSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onActivate: () => void;
  }
}

declare module "@components/WeatherWarning" {
  interface Iprops {
    warnings: WeatherWarning[];
  }
}

declare module "@components/WordTag" {
  interface Iprops {
    tags?: string[];
  }
}

declare module "@components/CustomAudio" {
  interface Iprops {
    type: AudioType;
    audio: string;
  }
}

declare module "@components/MDXEditor" {
  type CompileResult = BuildResult;
}

declare module "@/esbuild/plugins/esbuildVirtualFileSystem" {
  interface VFileOptions {
    files: VFile[];
  }
}

export {}
