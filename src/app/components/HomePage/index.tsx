import React from "react";
import WeatherFC from "../Weather";

import "./index.css";

const HomePage: React.FC = () => {
  return (
    <div className="--home-content-vessel">
      <WeatherFC></WeatherFC>
    </div>
  );
}

export default HomePage;