import React from "react";
import Weather from "../Weather";

import "./index.css";

const HomePage: React.FC = () => {
  return (
    <div className="--home-content-vessel">
      <Weather></Weather>
    </div>
  );
}

export default HomePage;