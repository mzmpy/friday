declare global {
  interface Window {
    sql: Record<string, (sql: string, params: Record<string, unknown>) => Promise<Word[]>>
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

export {
  Word
}