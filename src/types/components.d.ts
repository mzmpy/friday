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

declare module "@/esbuild/plugins/esbuildVirtualFileSystem" {
  interface VFileOptions {
    fsTree: VFileTree[];
  }

  interface VFileTree {
    name: string;
    resolveDir: string;
    absPath: string;
    isFile: boolean;
    isDir: boolean;
    ctx: string|VFileTree[];
  }
}

export {}
