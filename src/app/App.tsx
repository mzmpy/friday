import React, { StrictMode, useState } from "react";
import { createHashRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined
} from '@ant-design/icons';
import DictSider from "./components/DictSider";
import DictContent from "./components/DictContent";
import HomePage from "./components/HomePage";
import MDXEditorPage from "./components/MDXEditor";

import './App.css';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [word, setWord] = useState<Word>(null);
  const navigate = useNavigate();
  
  const onCollapse = () => setCollapsed(!collapsed);
  const onInputActivate = () => {
    if(collapsed) setCollapsed(false);
  };

  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    window.sql.query(
      `SELECT *
      FROM stardict
      WHERE word = $word`,
      {
        $word: target.value,
      }
    ).then((res) => {
      console.log(res);
      setWord(res[0]);

      navigate("/dict", {
        replace: false,
        state: { word: res[0] }
      });
    });
  };

  return (
    <Layout className="--dict-layout">
      <Sider
        collapsedWidth={48}
        theme="light"
        collapsible={!collapsed}
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={collapsed ? null : <MenuUnfoldOutlined></MenuUnfoldOutlined>}
      >
        <DictSider search={word?.word} collapsed={collapsed} onPressSearch={onSearch} onActivate={onInputActivate}></DictSider>
      </Sider>
      <Content>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};

export default function createApp() {
  const app = createRoot(
    document.getElementById('app')
  );

  const router = createHashRouter([
    {
      element: <App></App>,
      path: "/",
      children: [
        {
          element: <DictContent></DictContent>,
          path: "dict"
        },
        {
          element: <MDXEditorPage></MDXEditorPage>,
          path: "editor"
        },
        {
          element: <div>User</div>,
          path: "user"
        },
        {
          element: <HomePage></HomePage>,
          index: true
        }
      ]
    }
  ]);

  app.render(
    <StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </StrictMode>
  );
}
