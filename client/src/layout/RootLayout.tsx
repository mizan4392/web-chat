import { RedirectToSignIn, UserButton, useSession } from "@clerk/clerk-react";
import { Layout, Menu, theme, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect } from "react";
import { AimOutlined, PlusOutlined } from "@ant-design/icons";

import { useModal } from "../hooks/useModal";
import { User } from "../store/types";
import { createUser } from "../http/user.http";
import { useGeneralStore } from "../store/general.store";
import { getUserGroups } from "../http/group.http";
import { Link, Route, Routes } from "react-router-dom";
import ChatLayOut from "./ChatLayOut";

export default function RootLayout() {
  const { user, setUser, userGroups, setUserGroups } = useGeneralStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      return;
    }
    createUser()
      .then((data) => {
        setUser(data as User);
      })
      .catch(() => {
        return <RedirectToSignIn />;
      });
  }, [session]);

  useEffect(() => {
    if (user) {
      getUserGroups()
        .then((data) => {
          if (data?.length) {
            setUserGroups(data);
          } else {
            setUserGroups([]);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setUserGroups([]);
        });
    }
  }, [user]);

  const createGroupModal = useModal("CreateGroup");
  const joinGroupModal = useModal("JoinGroup");

  return (
    <Layout>
      <Sider trigger={null} collapsed={true} collapsible>
        <div className="h-full flex flex-col justify-between">
          <div className="demo-logo-vertical p-2">
            <img
              src="https://res.cloudinary.com/dmcimteb9/image/upload/v1732199779/brand_lum2fn.png"
              className="bg-white rounded-xl p-2"
            />
          </div>
          <div className="flex-1">
            <Menu theme="dark" mode="inline">
              <Menu.Item
                key="1"
                icon={<PlusOutlined />}
                onClick={createGroupModal.openModal}
              >
                Create Group
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<AimOutlined />}
                onClick={joinGroupModal.openModal}
              >
                Join Group
              </Menu.Item>
            </Menu>

            <div
              style={{
                overflow: "scroll",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {userGroups?.map((group) => (
                <Tooltip title={group.name} key={group.id} placement="right">
                  <Link
                    to={`groups/${group.id}`}
                    key={group.id}
                    className=" cursor-pointer"
                  >
                    <img
                      src={group.imageUrl}
                      className="rounded-full w-12 h-12"
                    />
                  </Link>
                  /
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <UserButton />
          </div>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-center items-center"
        >
          WebChat
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="groups/:groupId" element={<ChatLayOut />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
