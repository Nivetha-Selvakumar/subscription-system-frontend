import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_DASHBOARD_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminDashboard/adminDashboardActionTypes";

// --------------------------------------
//   CHILD COMPONENT FOR EACH BAR (FIX)
// --------------------------------------
const BarItem = ({ value, label, height, tooltipStyle, barStyle }: any) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Tooltip */}
      <div ref={tooltipRef} style={tooltipStyle}>
        {value}
      </div>

      {/* Bar */}
      <div
        style={barStyle(height)}
        onMouseEnter={() => {
          if (tooltipRef.current) tooltipRef.current.style.opacity = "1";
        }}
        onMouseLeave={() => {
          if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
        }}
      />

      {/* X-axis label */}
      <div
        style={{
          marginTop: "6px",
          fontSize: "12px",
          color: "#6B7280",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Subscription | Admin Dashboard";
  }, []);


  const { adminDashboardList } = useSelector(
    (state: any) => state.adminDashboardListReducer || {}
  );

  const dashboardData = adminDashboardList?.data;

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch({ type: ADMIN_DASHBOARD_LIST_REQUEST });
  }, [dispatch]);

  const stats = dashboardData?.statistics || {};
  const activities = dashboardData?.recentActivities || [];

  // ------------------------------------
  // Check if ALL values = 0
  // ------------------------------------
  const allZero = stats?.values?.every((v: number) => v === 0);

  // ------------------------------------
  // Dynamic height scaling
  // ------------------------------------
  const getScaledHeight = (value: number) => {
    const max = Math.max(...(stats?.values || [0]));
    if (max === 0) return 0;

    const minHeight = 20;
    const maxHeight = 160;

    return (value / max) * maxHeight + minHeight;
  };

  // ------------------------------------
  // Bar Style
  // ------------------------------------
  const bar = (height: number): React.CSSProperties => ({
    width: "28px",
    height: `${height}px`,
    background: "#034078",
    borderRadius: "6px",
    transition: "height .3s ease",
    cursor: "pointer",
  });

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "110%",
    background: "#000",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    opacity: 0,
    transition: "opacity .2s ease",
    pointerEvents: "none",
  };

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
        {/* ---------------------- */}
        {/*       CHART           */}
        {/* ---------------------- */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>Subscription Statistics (Past 6 months)</h3>

          <div
            style={{
              height: "300px",
              background: "#F3F4F6",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            {/* CHART AREA */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "22px",
              }}
            >
              {allZero
                ? stats?.labels?.map((_: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      width: "24px",
                      height: "50px",
                      background: "#D1D5DB",
                      borderRadius: "6px",
                      opacity: 0.5,
                    }}
                  ></div>
                ))
                : stats?.values?.map((val: number, i: number) => (
                  <BarItem
                    key={i}
                    value={val}
                    label={stats.labels[i]}
                    height={getScaledHeight(val)}
                    tooltipStyle={tooltipStyle}
                    barStyle={bar}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* ---------------------- */}
        {/*   RECENT ACTIVITIES   */}
        {/* ---------------------- */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>Recent Activities</h3>

          {activities?.slice(0, 3).map((a: any, i: number) => (
            <p key={i} style={activityItem}>
              ✔ {a.message} —{" "}
              <span style={{ color: "#6B7280" }}>{a.time}</span>
            </p>
          ))}

          {activities?.length > 3 && (
            <button
              onClick={() => setOpenModal(true)}
              style={{
                marginTop: "10px",
                background: "#034078",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              View All
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={activities}
      />
    </DashboardLayout>
  );
};

// ---------------------
// MODAL COMPONENT
// ---------------------
const Modal = ({ open, onClose, data }: any) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>All Activities</h3>

        {data?.map((a: any, i: number) => (
          <p key={i} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            ✔ {a.message} —{" "}
            <span style={{ color: "#6B7280" }}>{a.time}</span>
          </p>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            padding: "10px 16px",
            background: "#034078",
            borderRadius: "6px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ---------------- STYLES ----------------

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
