import React, { useEffect } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_DASHBOARD_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminDashboard/adminDashboardActionTypes";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { adminDashboardList } = useSelector(
    (state: any) => state.adminDashboardListReducer || {}
  );

  const dashboardData = adminDashboardList?.data;

  useEffect(() => {
    dispatch({ type: ADMIN_DASHBOARD_LIST_REQUEST });
  }, [dispatch]);

  const bar = (height: number) => ({
    width: "18px",
    height: `${height}px`,
    background: "#034078",
    borderRadius: "6px",
  });

  const stats = dashboardData?.statistics || {};
  const activities = dashboardData?.recentActivities || [];

  return (
    <DashboardLayout>
      <h2 style={{ fontWeight: 600, marginBottom: "25px", fontSize: "26px" }}>
        Admin Dashboard
      </h2>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div style={card}>
          <h4 style={title}>Total Users</h4>
          <p style={value}>{dashboardData?.totalUsers ?? 0}</p>
        </div>

        <div style={card}>
          <h4 style={title}>Active Subscriptions</h4>
          <p style={value}>{dashboardData?.activeSubscriptions ?? 0}</p>
        </div>

        <div style={card}>
          <h4 style={title}>Revenue (Monthly)</h4>
          <p style={value}>₹ {dashboardData?.monthlyRevenue ?? 0}</p>
        </div>

        <div style={card}>
          <h4 style={title}>Tickets Pending</h4>
          <p style={value}>{dashboardData?.pendingTickets ?? 0}</p>
        </div>
      </div>

      {/* 2 COLUMN SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* CHART */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>Subscription Statistics</h3>

          <div
            style={{
              height: "230px",
              background: "#F3F4F6",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
            }}
          >
            {stats?.values?.map((val: number, index: number) => (
              <div key={index} style={bar(val)}></div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITIES */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>Recent Activities</h3>

          {activities?.length ? (
            activities.map((a: any, i: number) => (
              <p key={i} style={activityItem}>
                ✔ {a.message} — <span style={{ color: "#6B7280" }}>{a.time}</span>
              </p>
            ))
          ) : (
            <p>No recent activities.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// STYLES
const card = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
};

const title = { fontSize: "14px", color: "#6B7280" };
const value = { fontSize: "24px", fontWeight: 600 };

const activityItem = {
  padding: "10px 0",
  borderBottom: "1px solid #eee",
  color: "#374151",
};

export default AdminDashboard;
