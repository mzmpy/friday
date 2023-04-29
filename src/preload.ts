// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer  } from "electron";
import type { Word, AudioType } from "./types/types";

contextBridge.exposeInMainWorld("sql", {
  query: (sql: string, params: Record<string, unknown>): Promise<Word[]> => ipcRenderer.invoke("query", sql, params)
});

contextBridge.exposeInMainWorld("http", {
  getPronounce: (audio: string, type: AudioType): Promise<string|null> => ipcRenderer.invoke("getPronounce", audio, type)
});
