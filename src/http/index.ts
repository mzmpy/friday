import type { AudioType } from "../types/types";

async function getPronounce(audio: string, type: AudioType): Promise<ArrayBuffer|null> {
  const dictVoice = await fetch(`http://dict.youdao.com/dictvoice?${type}&audio=${audio}`, {
    method: "GET"
  });

  return dictVoice.status === 200 ? await dictVoice.arrayBuffer() : null;
}

export { getPronounce }
