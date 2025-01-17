import { ipcMain, shell } from "electron";
import dictDB from "../sql/index";
import {
  getPronounce,
  getNowWeather,
  getCityId,
  getSevereWeather
} from "../http";
import { useMDX } from "@/esbuild";

const db = new dictDB("./stardict.db");
db.init();

export function runIpcMainHandlers() {
  ipcMain.handle("query", async (event: Electron.IpcMainInvokeEvent, sql: string, params: Record<string, unknown>) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [query] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);

    return await db.queryAll(
      sql,
      params
    );
  });

  ipcMain.handle("getPronounce", async (event: Electron.IpcMainInvokeEvent, audio: string, type: AudioType) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [getPronounce] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);

    return await getPronounce(audio, type);
  });

  ipcMain.handle("getNowWeather", async (event: Electron.IpcMainInvokeEvent, city: string) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [getNowWeather] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);

    const cityInfo = await getCityId(city);
    return cityInfo ? await getNowWeather(cityInfo.location[0].id) : null;
  });

  ipcMain.handle("getSevereWeather", async (event: Electron.IpcMainInvokeEvent, city: string) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [getSevereWeather] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);

    const cityInfo = await getCityId(city);
    return cityInfo ? await getSevereWeather(cityInfo.location[0].id) : null;
  });

  ipcMain.handle("openExternalWeatherLink", async (event: Electron.IpcMainInvokeEvent, link: string) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [openExternalWeatherLink] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);

    shell.openExternal(link);
  });

  ipcMain.handle("compileMDX", async (event: Electron.IpcMainInvokeEvent) => {
    console.log("--------------------------***--------------------------");
    console.log(`ipcMain handle [compileMDX] from "${__filename}": frameId=${event.frameId}, processId=${event.processId}`);
    const ctx = await useMDX();

    return JSON.stringify(ctx);
  });
}