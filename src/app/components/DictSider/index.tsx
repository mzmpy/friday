import React, { useState, useRef } from "react";
import { Input } from "antd";
import type { InputRef } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  UserOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import "./index.css";

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

  function clickToEditor() {
    navigate("/editor");
  }

  return (
    <div className="--dict-sider-vessel">
      {
        props.collapsed
          ? (
            <div className="--dict-sider-menu">
              <div className="--dict-sider-menu-item --dict-sider-menu-item-search"  onClick={props.onActivate}>
                <SearchOutlined></SearchOutlined>
              </div>
              <div className="--dict-sider-menu-item" onClick={clickToEditor}>
                <CodeOutlined></CodeOutlined>
              </div>
              <div className="--dict-sider-menu-item" onClick={clickToHome}>
                <HomeOutlined></HomeOutlined>
              </div>
              <div className="--dict-sider-menu-item --dict-sider-menu-item-end" onClick={clickToUser}>
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
