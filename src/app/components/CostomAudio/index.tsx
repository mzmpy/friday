import React from "react";
import Icon from "@ant-design/icons";
import AudioSvg from "../../../assets/dict/audio.svg";

import "./index.css";

interface Iprops {
  pronounce: 0 | 1;
}

const CustomAudio: React.FC<Iprops> = (props) => {
  return (
    <div className="--dict-audio-label">
      <Icon component={AudioSvg}></Icon>
      <span className="--dict-audio-label-pronounce-type">{props.pronounce === 0 ? '英' : '美'}</span>
    </div>
  );
}

export default CustomAudio;
