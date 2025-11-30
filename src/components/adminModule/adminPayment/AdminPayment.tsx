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

const AdminPaymentList: React.FC = () => {
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
    document.title = "Subscription | Admin Payments";
  }, []);
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
    navigate(`/admin/plan/payment/view/${payment.id}`, { state: payment });

  const safeValue = (v: any) =>
    v === null || v === undefined || v === "" ? "-" : v;

  return (
    <Sidebar>
      <ToastContainer containerId="User-Payment-List" />

      <div className="list-parent-container">
        {/* HEADER */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">Payments</p>
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
                  <TableCell align="center">View</TableCell>
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
                      <TableCell align="center">
                        <MenuItem
                          onClick={() => handleViewPayment(p)}
                          sx={{
                            display: "inline-flex",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.875rem",
                            border: "1px solid #d1d5db",
                            "&:hover": { background: "#f3f4f6" },
                            width: "fit-content",
                            margin: "0 auto",
                          }}
                        >
                          <Icon
                            icon="mingcute:eye-line"
                            width="18"
                          />

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

export default AdminPaymentList;
