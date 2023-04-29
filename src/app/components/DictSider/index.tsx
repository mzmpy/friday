import React, { useState } from "react";
import { Input } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';

import "./index.css";

interface Iprops {
  search: string;
  collapsed: boolean;
  onPressSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onActivate: () => void;
}

const DictSider: React.FC<Iprops> = (props) => {
  const [value, setValue] = useState<string>(props.search);

  return (
    <div className="--dict-sider-vessel">
      {
        props.collapsed
          ? (
            <div className="--dict-sider-menu">
              <div className="--dict-sider-menu-item-start"  onClick={props.onActivate}>
                <SearchOutlined></SearchOutlined>
              </div>
              <div className="--dict-sider-menu-item">
                <HomeOutlined></HomeOutlined>
              </div>
              <div className="--dict-sider-menu-item">
                <UserOutlined></UserOutlined>
              </div>
            </div>
          )
          : (
            <>
              <div className="--dict-sider-input">
                <Input
                  value={value}
                  placeholder="type to search"
                  allowClear
                  prefix={<SearchOutlined></SearchOutlined>}
                  onPressEnter={props.onPressSearch}
                  onChange={(ev) => { setValue(ev.target.value) }}
                ></Input>
              </div>
              <div className="--dict-sider-record"></div>
            </>
          )
      }
    </div>
  );
}

export default DictSider;
