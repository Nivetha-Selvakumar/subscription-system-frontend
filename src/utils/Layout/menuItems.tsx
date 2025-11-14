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
    { label: "Plans", path: "/admin/plans", icon: "mingcute:box-3-line" },
    { label: "Payments", path: "/admin/payments", icon: "mingcute:wallet-4-line" },
    { label: "Support Ticket", path: "/admin/adminSupportTicket", icon: "mingcute:lifebuoy-line" },
    { label: "Feedback", path: "/admin/feedback", icon: "mingcute:comment-2-line" },
  ],
  user: [
    { label: "Dashboard", path: "/user/dashboard", icon: "mingcute:grid-2-line" },
    { label: "Profile", path: "/user/profile", icon: "mingcute:user-4-line" },
    { label: "Subscription Plan", path: "/user/plans", icon: "mingcute:box-3-line" },
    { label: "Support Ticket", path: "/user/supportTicket", icon: "mingcute:chat-4-line" },
    { label: "Payments", path: "/user/payments", icon: "mingcute:wallet-4-line" },
    { label: "Feedback", path: "/user/feedback/list", icon: "mingcute:comment-2-line" },
  ],
  subscriber: [
    { label: "Dashboard", path: "/user/dashboard", icon: "mingcute:grid-2-line" },
    { label: "Profile", path: "/user/profile", icon: "mingcute:user-4-line" },
    { label: "Subscription Plan", path: "/user/plans", icon: "mingcute:box-3-line" },
    { label: "Support Ticket", path: "/user/supportTicket", icon: "mingcute:chat-4-line" },
    { label: "Payments", path: "/user/payments", icon: "mingcute:wallet-4-line" },
    { label: "Feedback", path: "/user/feedback/list", icon: "mingcute:comment-2-line" },
  ],
};
