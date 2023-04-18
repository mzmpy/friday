// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer  } from "electron";
import type { Word } from "./type";

contextBridge.exposeInMainWorld('sql', {
  queryTest: (sql: string, params: Record<string, unknown>): Promise<Word[]> => ipcRenderer.invoke("queryTest", sql, params)
});
