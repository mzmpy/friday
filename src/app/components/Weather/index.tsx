import React, { useState, useEffect, useRef } from "react";
import "qweather-icons/font/qweather-icons.css";
import type { Weather, NowWeather, WeatherOther, WeatherWarning } from "../../../types/types";
import { Input, InputRef, Badge, Popover } from "antd";
import WeatherWarningFC from "../WeatherWarning";

import "./index.css";

const WeatherFC: React.FC = () => {
  const [city, setCity] = useState<string>("广州市");
  const [oldCity, setOldCity] = useState<string>(city);
  const [weather, setWeather] = useState<NowWeather>(null);
  const [weatherOther, setWeatherOther] = useState<WeatherOther[]>(null);
  const [response, setResponse] = useState<Weather>(null);
  const [show, setShow] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout>(null);
  const [warnings, setWarnings] = useState<WeatherWarning[]>(null);

  const clickToShow = () => {
    show ? setShow(false) : setShow(true);
  };

  const onFxLink = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    clearTimeout(timer);
    window.utils.openExternalWeatherLink(response.fxLink);
  };

  const onChangeCity = () => {
    if(timer) clearTimeout(timer);
    setTimer(setTimeout(() => setShowInput(true), 200));
  };

  const onPressEnter = () => {
    if(city) {
      setOldCity(city);
      getNowWeather(city);
      getSevereWeather(city);
    } else {
      setCity(oldCity);
    }

    setShowInput(false);
  };

  const getNowWeather = (city: string) => {
    window.http.getNowWeather(city)
    .then((res) => {
      if(res.code === "200") {
        console.log(res);
        setResponse(res);
        setWeather(res.now);

        const other: WeatherOther[] = [];

        pushFeelsLike(res.now.feelsLike, other);
        pushWindScale(res.now.windDir, res.now.windScale, other);
        pushHumidity(res.now.humidity, other);
        pushPrecip(res.now.precip, other);
        pushPressure(res.now.pressure, other);

        setWeatherOther(other);
      }
    });
  };

  const getSevereWeather = (city: string) => {
    window.http.getSevereWeather(city)
    .then((res) => {
      if(res.code === "200") {
        console.log(res);
        setWarnings(res.warning)
      }
    });
  };

  useEffect(() => {
    getNowWeather(city);
    getSevereWeather(city);
  }, []);

  useEffect(() => {
    if(showInput) inputRef.current?.focus({ cursor: 'all' });
  }, [showInput]);

  return (
    <>
      {
        weather
          ? <div className="--weather-vessel">
              <div className="--weather-title" onDoubleClick={clickToShow}>
                <div className="--weather-title-profile">
                  <div className="--weather-title-profile-city" onDoubleClick={onFxLink} onClick={onChangeCity}>
                    {
                      showInput
                        ? <Input
                            ref={inputRef}
                            value={city}
                            placeholder="enter city"
                            allowClear
                            onChange={(ev) => setCity(ev.target.value)}
                            onPressEnter={onPressEnter}
                            onBlur={() => { if(!city) setCity(oldCity); setShowInput(false); }}
                          ></Input>
                        : <Badge count={warnings?.length || 0} size="small" title="">
                            {
                              warnings?.length
                                ? <Popover
                                    content={
                                      <WeatherWarningFC warnings={warnings}></WeatherWarningFC>
                                    }
                                    title="天气灾害预警"
                                    placement="right"
                                  >
                                    <span className="--weather-title-profile-city-label">
                                      {city || oldCity}
                                    </span>
                                  </Popover>
                                : <span className="--weather-title-profile-city-label">
                                    {city || oldCity}
                                  </span>
                            }
                          </Badge>
                    }
                  </div>
                  <div className="--weather-title-profile-icon">
                    <i className={`qi-${weather.icon}`}></i>
                  </div>
                  <div className="--weather-title-profile-discription">
                    <span>{weather.temp}<sup>o</sup>C</span>
                    <span>{weather.text}</span>
                  </div>
                </div>
                <div className="--weather-title-other">
                  {
                    weatherOther.map(item => (
                      <div key={item.key} className="--weather-title-other-item">
                        <span className="--weather-title-other-item-key">{item.key}</span>
                        <span className="--weather-title-other-item-value">{item.value}<>{item.Unit()}</></span>
                      </div>
                    ))
                  }
                </div>
              </div>
              {
                show
                  ? <div className="--weather-detail">Detail</div>
                  : <></>
              }
            </div>
          : <></>
      }
    </>
  );
}

const pushFeelsLike = (value: string, other: WeatherOther[]) => {
  value
    ? other.push({
        key: "体感",
        value: value,
        Unit: () => <><sup>o</sup>C</>
      })
    : null;
};

const pushWindScale = (key: string, value: string, other: WeatherOther[]) => {
  key
    ? other.push({
        key: key,
        value: value || "未知",
        Unit: () => <span>级</span>
      })
    : null;
};

const pushHumidity = (value: string, other: WeatherOther[]) => {
  value
    ? other.push({
        key: "湿度",
        value: value,
        Unit: () => <span>%</span>
      })
    : null;
};

const pushPrecip = (value: string, other: WeatherOther[]) => {
  value
    ? other.push({
        key: "降水量",
        value: value,
        Unit: () => <span>mm</span>
      })
    : null;
};

const pushPressure = (value: string, other: WeatherOther[]) => {
  value
    ? other.push({
        key: "大气压",
        value: value,
        Unit: () => <span>hPa</span>
      })
    : null;
};

export default WeatherFC;