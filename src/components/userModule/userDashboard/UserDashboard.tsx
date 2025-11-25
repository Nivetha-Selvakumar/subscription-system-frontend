import React, { useEffect } from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_DASHBOARD_LIST_REQUEST } from "../../../redux/actionTypes/UserModule/UserDashboard/userDashboardActionTypes";


const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDashboardList, userDashboardListLoading } = useSelector(
    (state: any) => state.userDashboardListReducer
  );

  const isExpired = (endDate: string) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  useEffect(() => {
    dispatch({ type: USER_DASHBOARD_LIST_REQUEST });
  }, [dispatch]);

  // ⭐ Date Formatter → "Dec 17, 2025"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  if (userDashboardListLoading || !userDashboardList) {
    return (
      <DashboardLayout>
        <h2 style={{ margin: "20px" }}>Loading user dashboard...</h2>
      </DashboardLayout>
    );
  }

  const {
    activePlan,
    nextBillingDate,
    totalSpent,
    recentSubscriptions,
    upcomingPayment,
  } = userDashboardList;

  return (
    <DashboardLayout>
      <h2 style={{ fontWeight: 600, marginBottom: "25px", fontSize: "26px" }}>
        Dashboard
      </h2>

      {/* TOP SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div style={cardStyle}>
          <h4 style={title}>Active Plan</h4>
          <p style={value}>{activePlan || "No Active Plan"}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={title}>Next Billing Date</h4>

          {isExpired(nextBillingDate) ? (
            <p style={{ ...value, color: "red", fontWeight: 700 }}>
              Plan Expired
            </p>
          ) : (
            <p style={value}>{formatDate(nextBillingDate)}</p>
          )}
        </div>

        <div style={cardStyle}>
          <h4 style={title}>Total Spent</h4>
          <p style={value}>₹ {totalSpent || 0}</p>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* SUBSCRIPTION HISTORY */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "15px" }}>Recent Subscriptions</h3>

          {recentSubscriptions?.length > 0 ? (
            recentSubscriptions.map((sub: any, index: number) => (
              <div key={index} style={listItem}>
                <div>
                  <strong>{sub.planName}</strong>
                  <p style={muted}>
                    ₹{sub.price} / {sub.planType}
                  </p>
                </div>
                <div style={statusPaid}>Paid</div>
              </div>
            ))
          ) : (
            <p style={muted}>No subscriptions found</p>
          )}
        </div>

        {/* UPCOMING PAYMENT */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "15px" }}>Upcoming Payment</h3>

          {/* CHECK IF SUBSCRIPTION EXPIRED */}
          {isExpired(nextBillingDate) ? (
            <>
              <p style={{ fontSize: "26px", fontWeight: 600, color: "red" }}>
                Plan Expired
              </p>
              <p style={muted}>Subscribe to continue the service</p>

              <button style={payBtn} onClick={() => navigate("/user/plans")}>
                Subscribe Now
              </button>
            </>
          ) : upcomingPayment ? (
            <>
              <p style={{ fontSize: "32px", fontWeight: 600 }}>
                ₹{upcomingPayment.amount}
              </p>
              <p style={muted}>Due on {formatDate(upcomingPayment.dueDate)}</p>

              <button style={payBtn} onClick={() => navigate("/user/plans")}>
                View Plans
              </button>
            </>
          ) : (
            <p style={muted}>No upcoming payment</p>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

// ==== STYLES =====
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
};

const title = { fontSize: "14px", color: "#6B7280" };
const value = { fontSize: "22px", fontWeight: 600 };

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const muted = { color: "#6B7280", fontSize: "14px" };

const statusPaid = {
  background: "#D1FAE5",
  color: "#065F46",
  padding: "4px 12px",
  borderRadius: "8px",
};

const payBtn = {
  marginTop: "15px",
  width: "100%",
  background: "#034078",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

export default UserDashboard;
