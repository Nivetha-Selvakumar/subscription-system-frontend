import React, { ReactNode } from "react";
import Sidebar from "./sideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar/>
      <div style={{ marginLeft: "220px", paddingTop: "60px" }}>{children}</div>
    </div>
  );
};

export default Layout;
