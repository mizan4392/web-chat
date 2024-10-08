import { useAuth, useSession } from "@clerk/clerk-react";
import { Button, Divider, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  AimOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ShareAltOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Route, Routes } from "react-router-dom";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { session } = useSession();

  const { isSignedIn } = useAuth();

  console.log(session);
  console.log(isSignedIn);
  return (
    <Layout>
      <Sider trigger={null} collapsed={true}>
        <div className="demo-logo-vertical p-2">
          <img src="./brand.png" className="bg-white rounded-xl p-2" />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PlusOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="1" icon={<AimOutlined />}>
            nav 2
          </Menu.Item>
        </Menu>
      </Sider>
      {collapsed ? null : (
        <Sider className="" trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
}