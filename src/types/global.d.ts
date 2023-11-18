// 任何的 declare 默认就是 global 的，所以在非模块的 *.d.ts 文件中是不能出现 declare global 的；如果想
// 要全局声明 declare global，只有在模块文件中的定义
import { Word, Weather, SevereWeather } from "./types.d.ts";

declare global {
  interface Window {
    sql: SQLMethods;
    http: HTTPMethods;
    utils: Utils;
  }

  interface SQLMethods {
    query: (sql: string, params: Record<string, unknown>) => Promise<Word[]>;
  }

  interface HTTPMethods {
    getPronounce: (audio: string, type: AudioType) => Promise<ArrayBuffer|null>,
    getNowWeather: (city: string) => Promise<Weather|null>,
    getSevereWeather: (city: string) => Promise<SevereWeather|null>
  }

  interface Utils {
    openExternalWeatherLink: (link: string) => void;
  }
}

export {}
