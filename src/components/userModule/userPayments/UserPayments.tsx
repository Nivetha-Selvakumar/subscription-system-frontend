/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import { ToastContainer } from "react-toastify";
import { SUBSCRIPTION_PAYMENT_LIST_REQUEST } from "../../../redux/actionTypes/UserModule/UserSubscription/userSubscriptionPaymentListActionTypes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const handleDownloadInvoice = (payment: any) => {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  // Colors
  const primaryColor = "#1f3b4d";
  const lightGray = "#f0f0f0";
  const darkText = "#1a1a1a";

  // HEADER
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 600, 80, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#ffffff");
  doc.text("SUBSCRIPTION INVOICE", 40, 50);

  // INVOICE INFO
  doc.setFillColor(lightGray);
  doc.rect(40, 100, 520, 70, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(darkText);
  doc.text(`Invoice No: INV-${payment.id}`, 60, 130);
  doc.text(`Invoice Date: ${payment.paymentDate}`, 60, 150);

  // PAYMENT SUMMARY TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text("Payment Summary", 40, 215);

  // PAYMENT SUMMARY TABLE
  autoTable(doc, {
    startY: 230,
    theme: "striped",
    headStyles: {
      fillColor: primaryColor,
      textColor: "#ffffff",
      halign: "left",
    },
    styles: {
      halign: "left",
      fontSize: 12,
      cellPadding: 6,
      textColor: darkText,
    },
    body: [
      ["Plan Name", payment.planName],
      ["Amount", ` Rs. ${payment.amount}`],
      ["Payment Status", payment.paymentStatus],
      ["Subscription Status", payment.subscriptionStatus],
      ["Paid On", payment.paymentDate],
    ],
  });

  // FOOTER
  const finalY = (doc as any).lastAutoTable?.finalY || 300;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(darkText);
  doc.text(
    "Thank you for your payment! For support, contact support@subsystem.com",
    40,
    finalY + 40
  );

  doc.setFontSize(10);
  doc.setTextColor("#555");
  doc.text("© 2025 Subscription Management System", 40, finalY + 65);

  doc.save(`Invoice_${payment.planName}.pdf`);
};




const UserPaymentList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("desc");

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "planName",
    "amount",
    "paymentStatus",
    "paymentDate",
    "subscriptionStatus",
  ]);

  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const { subscriptionPaymentListLoading, subscriptionPaymentList } =
    useSelector((state: any) => state.subscriptionPaymentListReducer || {});

  // MAP BACKEND RESPONSE TO UI COLUMN NAMES
  const rawData = subscriptionPaymentList?.data?.data || [];

  const payments = rawData.map((p: any) => ({
    id: p.planId,
    planName: p.planName,
    amount: p.lastPaidAmount,
    paymentStatus: p.lastPaymentStatus,
    paymentDate: p.lastPaymentDate,
    subscriptionStatus: p.currentSubStatus,
  }));

  const totalCount = subscriptionPaymentList?.data?.totalCount || 0;

  const allColumns = [
    { id: "planName", label: "Plan Name", sortable: true },
    { id: "amount", label: "Amount (₹)", sortable: true },
    { id: "paymentStatus", label: "Payment Status", sortable: true },
    { id: "subscriptionStatus", label: "Subscription Status" },
    { id: "paymentDate", label: "Paid On", sortable: true },
  ];


  const fetchPaymentList = () => {
    dispatch({
      type: SUBSCRIPTION_PAYMENT_LIST_REQUEST,
      payload: {
        search: searchValue,
        sortBy: sortField,
        sortDir: sortOrdered,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    });
  };

  useEffect(() => {
    fetchPaymentList();
  }, [page, rowsPerPage, sortField, sortOrdered, searchValue]);

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrdered === "asc";
    setSortField(field);
    setSortOrdered(isAsc ? "desc" : "asc");
  };

  const handleColumnMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setColumnAnchorEl(e.currentTarget);

  const handleColumnMenuClose = () => setColumnAnchorEl(null);

  const handleToggleColumn = (id: string) => {
    setVisibleColumns((prev) =>
      prev.includes(id)
        ? prev.length === 1
          ? prev
          : prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const handleSearchText = (text: any) => {
    setSearchValue(text);
    setPage(0);
  };

  const handleViewPayment = (payment: any) =>
    navigate(`/user/plan/payment/view/${payment.id}`, { state: payment });

  const safeValue = (v: any) =>
    v === null || v === undefined || v === "" ? "-" : v;

  return (
    <Sidebar>
      <ToastContainer containerId="User-Payment-List" />

      <div className="list-parent-container">
        {/* HEADER */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">My Payments</p>
            <Chip label={`${totalCount} records`} className="overall-chips" />
          </div>

          <div className="search-container">
            <DynamicSearchField
              name=""
              type="search"
              disabled={subscriptionPaymentListLoading}
              label="Search"
              onChange={handleSearchText}
            />

            <div className="button-container">
              {/* Columns Button */}
              <div className="columnGrid-container" onClick={handleColumnMenuOpen}>
                <Icon icon="mingcute:column-line" width="20" />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-container-client">
          <TableContainer>
            <Table stickyHeader className="admin-users-table">
              <TableHead>
                <TableRow>
                  {allColumns
                    .filter((c) => visibleColumns.includes(c.id))
                    .map((col) => (
                      <TableCell key={col.id}>
                        {col.sortable ? (
                          <TableSortLabel
                            active={sortField === col.id}
                            direction={sortOrdered}
                            onClick={() => handleSort(col.id)}
                          >
                            {col.label}
                          </TableSortLabel>
                        ) : (
                          col.label
                        )}
                      </TableCell>
                    ))}
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subscriptionPaymentListLoading ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((p: any) => (
                    <TableRow hover key={p.id}>
                      {allColumns
                        .filter((c) => visibleColumns.includes(c.id))
                        .map((col) => (
                          <TableCell key={col.id}>
                            {col.id === "amount"
                              ? `₹ ${safeValue(p[col.id])}`
                              : safeValue(p[col.id])}
                          </TableCell>
                        ))}

                      {/* ⭐ CLEAN VIEW BUTTON (NO BLUE BOX) */}
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px", // ⭐ light spacing
                        }}
                      >
                        {/* VIEW BUTTON */}
                        <MenuItem
                          onClick={() => handleViewPayment(p)}
                          sx={{
                            padding: "4px",
                            borderRadius: "6px",
                            border: "1px solid #E5E7EB",
                            "&:hover": { background: "#F3F4F6" },
                            minWidth: "32px",
                            height: "32px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon icon="mingcute:eye-line" width="18" />
                        </MenuItem>

                        {/* DOWNLOAD BUTTON */}
                        <MenuItem
                          onClick={() => handleDownloadInvoice(p)}
                          sx={{
                            padding: "4px",
                            borderRadius: "6px",
                            border: "1px solid #E5E7EB",
                            "&:hover": { background: "#F3F4F6" },
                            minWidth: "32px",
                            height: "32px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Icon icon="mingcute:download-line" width="18" />
                        </MenuItem>
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION */}
          <div className="pagination-container">
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 30]}
              labelRowsPerPage=""
              backIconButtonProps={{ children: <KeyboardArrowLeft /> }}
              nextIconButtonProps={{ children: <KeyboardArrowRight /> }}
            />
          </div>
        </div>

        {/* COLUMN MENU */}
        <Menu anchorEl={columnAnchorEl} open={Boolean(columnAnchorEl)} onClose={handleColumnMenuClose}>
          {allColumns.map((col) => (
            <MenuItem
              key={col.id}
              disabled={visibleColumns.length === 1 && visibleColumns.includes(col.id)}
              onClick={() => handleToggleColumn(col.id)}
            >
              <input type="checkbox" checked={visibleColumns.includes(col.id)} readOnly />
              <span style={{ marginLeft: 8 }}>{col.label}</span>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Sidebar>
  );
};

export default UserPaymentList;
