import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import "./App.css";
import { useNavigate } from "react-router-dom";

import { Layout } from "antd";
import CreateGroup from "./components/modals/CreateGroup.modal";
import JoinGroupModal from "./components/modals/JoinGroupModal";
import RootLayout from "./layout/RootLayout";
import InvitePeopleModal from "./components/modals/InvitePeople.modal";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <ProtectedRoutes>
        <Layout className="w-full h-full">
          <RootLayout />
          <CreateGroup />
          <JoinGroupModal />
          <InvitePeopleModal />
        </Layout>
      </ProtectedRoutes>
    </ClerkProvider>
  );
}

export default App;
