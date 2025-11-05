// utils/Layout/menuItems.ts
export interface MenuItem {
  label: string;
  path: string;
  icon: string; // will store MingCute icon name
}

export interface MenuConfig {
  [key: string]: MenuItem[];
}

export const menuConfig: MenuConfig = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "mingcute:grid-2-line" },
    { label: "Users", path: "/admin/users", icon: "mingcute:user-3-line" },
    { label: "Reports", path: "/admin/reports", icon: "mingcute:chart-bar-line" },
  ],
  user: [
    { label: "Dashboard", path: "/user/dashboard", icon: "mingcute:grid-2-line" },
    { label: "Profile", path: "/user/profile", icon: "mingcute:user-4-line" },
    { label: "Support", path: "/user/support", icon: "mingcute:chat-4-line" },
  ],
  subscriber: [
    { label: "Dashboard", path: "/subscriber/dashboard", icon: "mingcute:grid-2-line" },
    { label: "Plans", path: "/subscriber/plans", icon: "mingcute:box-3-line" },
    { label: "Payments", path: "/subscriber/payments", icon: "mingcute:wallet-3-line" },
  ],
};
