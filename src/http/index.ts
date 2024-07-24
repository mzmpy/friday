const meta = {
  key: "fdf2e18685834f0ebb0b8892e351a846"
};

async function getPronounce(audio: string, type: AudioType): Promise<ArrayBuffer|null> {
  const dictVoice = await fetch(`http://dict.youdao.com/dictvoice?type=${type}&audio=${audio}`, {
    method: "GET"
  });

  return dictVoice.status === 200 ? await dictVoice.arrayBuffer() : null;
}

async function getNowWeather(cityId: string): Promise<Weather|null> {
  const url = new URL("https://devapi.qweather.com/v7/weather/now");
  url.searchParams.set("key", meta.key);
  url.searchParams.set("location", cityId);

  const weatherData = await fetch(url, {
    method: "GET"
  });

  return weatherData.status === 200 ? await weatherData.json() : null;
}

async function getCityId(city: string): Promise<CityInfo|null> {
  const url = new URL("https://geoapi.qweather.com/v2/city/lookup");
  url.searchParams.set("key", meta.key);
  url.searchParams.set("location", city);
  url.searchParams.set("range", "cn");
  url.searchParams.set("number", "1");

  const cityData = await fetch(url);

  return cityData.status === 200 ? await cityData.json() : null;
}

async function getSevereWeather(cityId: string): Promise<SevereWeather|null> {
  const url = new URL("https://devapi.qweather.com/v7/warning/now?");
  url.searchParams.set("key", meta.key);
  url.searchParams.set("location", cityId);

  const severeWeatherData = await fetch(url, {
    method: "GET"
  });

  return severeWeatherData.status === 200 ? await severeWeatherData.json() : null;
}

export { getPronounce, getNowWeather, getCityId, getSevereWeather }
