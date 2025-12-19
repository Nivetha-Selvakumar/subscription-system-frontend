import React from "react";
import Sidebar from "./sideBar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Sidebar>
      <div style={{ padding: "20px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
        {children}
      </div>
    </Sidebar>
  );
};

export default DashboardLayout;
