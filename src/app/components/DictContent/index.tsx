import React from "react";
import Audio from "../CostomAudio";
import WordTag from "../WordTag";
import type { Word } from "../../../types/types.d.ts";

import "./index.css";

interface Iprops {
  word: Word;
}

const fields: Record<string, string> = {
  "p": "过去式",
  "d": "过去分词",
  "i": "现在分词",
  "3": "第三人称单数",
  "r": "比较级",
  "t": "最高级",
  "s": "复数形式",
  "0": "lemma",
  "1": "lemma变换形式"
};

const DictContent: React.FC<Iprops> = (props) => {
  return (
    <div className="--dict-content-vessel">
      {props.word?.word && (
        <>
          <div className="--dict-content-head">{props.word?.word}</div>
          <div className="--dict-content-head-known">
            <Audio pronounce={0}></Audio>
            <Audio pronounce={1}></Audio>
            <span className="--dict-content-head-known-phonetic">{"音标：/" + (props.word?.phonetic || "") + "/"}</span>
          </div>
          <div className="--dict-content-head-bottom"></div>
          <div className="--dict-content-body">
            <WordTag tags={props.word?.tag.split(' ')}></WordTag>
            <div className="--dict-content-body-definition">
              <div className="--dict-content-body-definition-title">原义</div>
              {
                props.word?.definition.split("\n").map(item => {
                  return (
                    <div key={item} className="--dict-content-body-definition-item">{item}</div>
                  );
                })
              }
            </div>
            <div className="--dict-content-body-translation">
              <div className="--dict-content-body-translation-title">释义</div>
              {
                props.word?.translation.split("\n").map(item => {
                  return (
                    <div key={item} className="--dict-content-body-translation-item">{item}</div>
                  );
                })
              }
            </div>
            <div className="--dict-content-body-exchange">
              <div className="--dict-content-body-exchange-title">时态：</div>
              {
                props.word?.exchange.split("/").map(item => {
                  const [key, exch] = item.split(":");
                  return (
                    <span key={item} className="--dict-content-body-exchange-item">{`${fields[key]}/${exch}`}</span>
                  );
                })
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DictContent;