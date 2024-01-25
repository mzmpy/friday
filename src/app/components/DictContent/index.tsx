import React from "react";
import Audio from "../CostomAudio";
import WordTag from "../WordTag";
import type { Word } from "../../../types/types";
import { useLocation } from "react-router-dom";

import "./index.css";

interface LocationState {
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

const DictContent: React.FC = () => {
  const { state }: { state: LocationState } = useLocation();

  return (
    <div className="--dict-content-vessel">
      {state.word?.word && (
        <>
          <div className="--dict-content-head">{state.word?.word}</div>
          <div className="--dict-content-head-known">
            <Audio type={0} audio={state.word?.word}></Audio>
            <Audio type={1} audio={state.word?.word}></Audio>
            <span className="--dict-content-head-known-phonetic">{"音标：/" + (state.word?.phonetic || "") + "/"}</span>
          </div>
          <div className="--dict-content-head-bottom"></div>
          <div className="--dict-content-body">
            {
              state.word?.tag && (
                <WordTag tags={state.word?.tag.split(' ')}></WordTag>
              )
            }
            {
              state.word?.definition && (
                <div className="--dict-content-body-definition">
                  <div className="--dict-content-body-definition-title">释义</div>
                  {
                    state.word?.definition?.split("\n").map((item: string) => {
                      return (
                        <div key={item} className="--dict-content-body-definition-item">{item}</div>
                      );
                    })
                  }
                </div>
              )
            }
            {
              state.word?.translation && (
                <div className="--dict-content-body-translation">
                  <div className="--dict-content-body-translation-title">译义</div>
                  {
                    state.word?.translation?.split("\n").map((item: string) => {
                      return (
                        <div key={item} className="--dict-content-body-translation-item">{item}</div>
                      );
                    })
                  }
                </div>
              )
            }
            {
              state.word?.exchange && (
                <div className="--dict-content-body-exchange">
                  <div className="--dict-content-body-exchange-title">时态：</div>
                  {
                    state.word?.exchange?.split("/").map((item: string) => {
                      const [key, exch] = item.split(":");
                      return (
                        <span key={item} className="--dict-content-body-exchange-item">{`${fields[key]}/${exch}`}</span>
                      );
                    })
                  }
                </div>
              )
            }
          </div>
        </>
      )}
    </div>
  );
}

export default DictContent;