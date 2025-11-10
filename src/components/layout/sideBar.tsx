import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Layout/Sidebar.scss";
import NavBar from "./navBar";
import { menuConfig, MenuItem } from "../../utils/Layout/menuItems";
import { Icon } from "@iconify/react"; // ✅ import iconify

interface SidebarProps {
    children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({children}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [role, setRole] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const menus: MenuItem[] = menuConfig[role.toLowerCase()] || [];
    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        const storedRole = localStorage.getItem("role");
        if (storedUser) setUserName(storedUser);
        if (storedRole) setRole(storedRole);
    }, []);

    return (
        <div className="layout">
            {/* Navbar */}
            <NavBar userName={userName} />

            {/* Sidebar */}
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
                    <Icon
                        icon={collapsed ? "mingcute:right-line" : "mingcute:left-line"}
                        width="20"
                        height="20"
                    />
                </div>

                <ul className="menu-list">
                    {menus.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                <Icon icon={item.icon} width="20" height="20" className="icon" />
                                {!collapsed && <span className="label">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ✅ Main content area */}
            <div className="main-content">
                <div className="content-wrapper">{children}</div>
            </div>
        </div>
    );
};

export default Sidebar;
