import React from "react";
import { Input } from "antd";
import {
  SearchOutlined
} from '@ant-design/icons';

import "./index.css";

interface Iprops {
  collapsed: boolean;
  onPressSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onActivate: () => void;
}

const DictSider: React.FC<Iprops> = (props) => {
  return (
    <div className="--dict-sider-vessel">
      <div className="--dict-sider-input">
        <Input
          placeholder="type to search"
          allowClear={!props.collapsed}
          prefix={<SearchOutlined onClick={props.onActivate}></SearchOutlined>}
          onPressEnter={props.onPressSearch}
        ></Input>
      </div>
      <div className="--dict-sider-record"></div>
    </div>
  );
}

export default DictSider;
