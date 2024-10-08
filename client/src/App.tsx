import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Layout } from "antd";
import CreateGroup from "./components/modals/CreateGroup.modal";
import JoinGroupModal from "./components/modals/JoinGroupModal";

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
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <CreateGroup />
          <JoinGroupModal />
        </Layout>
      </ProtectedRoutes>
    </ClerkProvider>
  );
}

export default App;
