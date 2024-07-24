// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer  } from "electron";

contextBridge.exposeInMainWorld("sql", {
  query: (sql: string, params: Record<string, unknown>): Promise<Word[]> => ipcRenderer.invoke("query", sql, params)
});

contextBridge.exposeInMainWorld("http", {
  getPronounce: (audio: string, type: AudioType): Promise<ArrayBuffer|null> => ipcRenderer.invoke("getPronounce", audio, type),
  getNowWeather: (city: string): Promise<Weather|null> => ipcRenderer.invoke("getNowWeather", city),
  getSevereWeather: (city: string): Promise<SevereWeather|null> => ipcRenderer.invoke("getSevereWeather", city)
});

contextBridge.exposeInMainWorld("utils", {
  openExternalWeatherLink: (link: string): void => {
    ipcRenderer.invoke("openExternalWeatherLink", link);
  }
});
