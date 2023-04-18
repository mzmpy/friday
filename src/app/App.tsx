import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import DictSider from "./components/DictSider";
import DictContent from "./components/DictContent";
import type { Word } from "../types/types.d.ts";

import './App.css';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [word, setWord] = useState<Word>(null);
  
  const onCollapse = () => setCollapsed(!collapsed);
  const onInputActivate = () => {
    if(collapsed) setCollapsed(false);
  };

  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    window.sql.queryTest(
      `SELECT *
      FROM stardict
      WHERE word = $word`,
      {
        $word: target.value,
      }
    ).then((res) => {
      console.log(res);
      setWord(res[0]);
    });
  };

  return (
    <Layout className="--dict-layout">
      <Sider
        collapsedWidth={48}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={collapsed ? <MenuFoldOutlined></MenuFoldOutlined> : <MenuUnfoldOutlined></MenuUnfoldOutlined>}
      >
        <DictSider collapsed={collapsed} onPressSearch={onSearch} onActivate={onInputActivate}></DictSider>
      </Sider>
      <Content>
        <DictContent word={word}></DictContent>
      </Content>
    </Layout>
  );
};

export default function createApp() {
  const app = createRoot(
    document.getElementById('app')
  );

  app.render(
    <StrictMode>
      <App></App>
    </StrictMode>
  );
}
