import React from "react";
import Icon from "@ant-design/icons";
import AudioSvg from "../../../assets/dict/audio.svg";

import "./index.css";

const CustomAudio: React.FC<Iprops> = (props) => {
  const onPronounce = () => {
    window.http.getPronounce(props.audio, props.type)
    .then(async (data) => {
      const audio = new Blob([data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(audio);
      const Audio = new window.Audio(url);
      await Audio.play();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="--dict-audio-label">
      <Icon component={AudioSvg} onClick={onPronounce}></Icon>
      <span className="--dict-audio-label-pronounce-type">{props.type === 0 ? '英' : '美'}</span>
    </div>
  );
}

export default CustomAudio;
