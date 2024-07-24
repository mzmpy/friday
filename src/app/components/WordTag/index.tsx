import React from "react";
import { Space, Tag } from "antd";
import { TagOutlined } from "@ant-design/icons";

import "./index.css";

const fields: Record<string, string> = {
  "zk": "中考",
  "gk": "高考",
  "ky": "考研",
  "cet4": "CET4",
  "cet6": "CET6",
  "toefl": "托福",
  "ielts": "雅思",
  "gre": "GRE"
}

const WordTag: React.FC<Iprops> = (props) => {
  return (
    <div className="--dict-content-body-tags">
      <Space size={[0, 3]} wrap>
        {
          props.tags.map(item => {
            return (
              <Tag key={item} color="#55acee">
                <TagOutlined style={{ color: "#ffffff" }}></TagOutlined>
                <span className="--dict-content-body-tags-text">{fields[item]}</span>
              </Tag>
            );
          })
        }
      </Space>
    </div>
  );
}

export default WordTag;
