declare global {
  interface Window {
    sql: SQLMethods;
    http: HTTPMethods;
  }

  interface SQLMethods {
    query: (sql: string, params: Record<string, unknown>) => Promise<Word[]>;
  }

  interface HTTPMethods {
    getPronounce: (audio: string, type: AudioType) => Promise<ArrayBuffer|null>
  }
}

interface Word {
  id: number;
  word: string;
  sw: string;
  phonetic: string;
  definition: string;
  translation: string;
  pos: number;
  collins: number;
  oxford: number;
  tag: string;
  bnc: number;
  frq: number;
  exchange: string;
  detail: string;
  audio: string;
}

type AudioType = 0 | 1;

export {
  Word,
  AudioType
}