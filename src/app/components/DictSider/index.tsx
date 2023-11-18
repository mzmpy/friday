import React, { useState, useRef } from "react";
import { Input } from "antd";
import type { InputRef } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import "./index.css";

interface Iprops {
  search: string;
  collapsed: boolean;
  onPressSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onActivate: () => void;
}

const DictSider: React.FC<Iprops> = (props) => {
  const [value, setValue] = useState<string>(props.search);
  const navigate = useNavigate();
  const inputRef = useRef<InputRef>();

  function clickToHome() {
    navigate("/");
  }

  function clickToUser() {
    navigate("/user");
  }

  return (
    <div className="--dict-sider-vessel">
      {
        props.collapsed
          ? (
            <div className="--dict-sider-menu">
              <div className="--dict-sider-menu-item-start"  onClick={props.onActivate}>
                <SearchOutlined></SearchOutlined>
              </div>
              <div className="--dict-sider-menu-item" onClick={clickToHome}>
                <HomeOutlined></HomeOutlined>
              </div>
              <div className="--dict-sider-menu-item" onClick={clickToUser}>
                <UserOutlined></UserOutlined>
              </div>
            </div>
          )
          : (
            <>
              <div className="--dict-sider-input">
                <Input
                  ref={inputRef}
                  value={value}
                  placeholder="type to search"
                  allowClear
                  prefix={<SearchOutlined></SearchOutlined>}
                  onPressEnter={props.onPressSearch}
                  onChange={(ev) => { setValue(ev.target.value) }}
                  onFocus={() => { inputRef.current.focus({ cursor: 'all' }) }}
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
