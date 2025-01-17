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

/*******************************************************/

interface CityInfo {
  code: string;
  location: Location[];
}

interface Location {
  name: string;
  id: string;
  [key: string]: string;
}

/*******************************************************/

interface Refer {
  license: Array<string> | null;
  sources: Array<string> | null;
}

interface BasicWeather {
  code: string;
  fxLink: string;
  refer: Refer;
  updateTime: string;
}

interface Weather extends BasicWeather {
  now: NowWeather;
}

type NowWeather = Record<string, string>;

interface SevereWeather extends BasicWeather {
  warning: WeatherWarning[]
}

interface WeatherWarning {
  id: string;
  sender: string | null;
  pubTime: string;
  title: string;
  startTime: string | null;
  endTime: string | null;
  status: 'active' | 'update' | 'cancel';
  level: string;
  severity: string;
  severityColor: string | null;
  type: string;
  typeName: string;
  urgency: string | null;
  certainty: string | null;
  text: string;
  related: string | null;
}

declare enum WarningLevel {
  White = '白色',
  Blue = '蓝色',
  Green = '绿色',
  Yellow = '黄色',
  Orange = '橙色',
  Red = '红色',
  Black = '黑色'
}

interface WeatherOther {
  key: string;
  value: string;
  Unit: () => JSX.Element;
}
