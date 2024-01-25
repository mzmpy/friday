import React from "react";
import type { WeatherWarning } from "../../../types/types";
import { Carousel, Card, Tooltip } from "antd";

import "./index.css";

interface Iprops {
  warnings: WeatherWarning[]
}

const WeatherWarningFC: React.FC<Iprops> = (props) => {
  return (
    <div className="--weather-warning" onClick={(ev) => ev.stopPropagation()} onDoubleClick={(ev) => ev.stopPropagation()}>
      <Carousel autoplay dots={{ className: "dot-class" }}>
        {
          props.warnings.map((warning) => (
            <Card
              className="--weather-warning-card"
              key={warning.id}
              title={
                <Tooltip title={warning.title} placement={'right'}>
                  <div className="--weather-warning-card-title" style={{ color: `${warning.severityColor}` }}>
                    {warning.title}
                  </div>
                </Tooltip>
              }
              headStyle={{ backgroundColor: '#8d8d8d', cursor: 'pointer', padding: '0' }}
              bodyStyle={{ overflow: "auto", fontSize: '11px', padding: '0 24px', textAlign: 'justify' }}
            >
              <p>{warning.text}</p>
            </Card>
          ))
        }
      </Carousel>
    </div>
  );
};

export default WeatherWarningFC;
