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
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Paper,
} from "@mui/material";

import {
  MoreVert,
  Visibility,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";
import { useNavigate } from "react-router-dom";

import { SUPPORT_TICKET_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketListActionTypes";

import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import { ToastContainer } from "react-toastify";

const AdminSupportTicketList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Subscription | Admin Support Ticket";
  }, []);
  // ------------------------ STATES ------------------------
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [ticketFilter, setTicketFilter] = useState("ALL");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "username",
    "subject",
    "issueDescription",
    "ticketStatus",
    "status",
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
  ]);

  // ------------------------ REDUX ------------------------
  const { supportTicketList, supportTicketListLoading } = useSelector(
    (state: any) => state.supportTicketListReducer || {}
  );

  const tickets = supportTicketList?.data?.data || [];
  const totalCount = supportTicketList?.data?.totalCount || 0;

  // ------------------------ COLUMNS ------------------------
  const columns = [
    { id: "username", label: "Username", sortable: true },
    { id: "subject", label: "Subject", sortable: true },
    { id: "issueDescription", label: "Issue", sortable: true },
    { id: "ticketStatus", label: "Ticket Status", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "createdAt", label: "Created Date", sortable: true },
    { id: "createdBy", label: "Created By", sortable: true },
    { id: "updatedAt", label: "Updated Date", sortable: true },
    { id: "updatedBy", label: "Updated By", sortable: true },
  ];

  // ------------------------ API CALL ------------------------
  const fetchTicketList = () => {
    let filterBy = "";

    if (ticketFilter !== "ALL") {
      filterBy = `ticketStatus:${ticketFilter}`;
    }

    dispatch({
      type: SUPPORT_TICKET_LIST_REQUEST,
      payload: {
        search: searchValue,
        filterBy,
        sortBy: sortField,
        sortDir,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    });
  };

  useEffect(() => {
    fetchTicketList();
  }, [page, rowsPerPage, sortField, sortDir, searchValue, ticketFilter]);

  // ------------------------ HANDLERS ------------------------
  const handlePageChange = (_: any, newPage: number) => setPage(newPage);
  const handleRowsChange = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDir === "asc";
    setSortField(field);
    setSortDir(isAsc ? "desc" : "asc");
  };

  const handleMenuOpen = (event: any, ticket: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const safeValue = (val: any) => (!val ? "-" : val);

  const handleToggleColumn = (id: string) => {
    setVisibleColumns((prev) => {
      const exists = prev.includes(id);
      if (exists && prev.length === 1) return prev;
      return exists ? prev.filter((c) => c !== id) : [...prev, id];
    });
  };

  // ------------------------ STATUS COLORS ------------------------
  const ticketStatusChip = (s: string) => {
    if (s === "OPEN")
      return <Chip label="Open" sx={{ background: "#bfdbfe", color: "#1e3a8a" }} />;
    if (s === "IN_PROGRESS")
      return <Chip label="In Progress" sx={{ background: "#fef9c3", color: "#854d0e" }} />;
    if (s === "CLOSED")
      return <Chip label="Closed" sx={{ background: "#fecaca", color: "#7f1d1d" }} />;
    return <Chip label={s} />;
  };

  const statusChip = (s: string) => {
    if (s === "ACTIVE")
      return <Chip label="Active" sx={{ background: "#d1fae5", color: "#065f46" }} />;
    if (s === "INACTIVE")
      return <Chip label="Inactive" sx={{ background: "#fee2e2", color: "#991b1b" }} />;
    return <Chip label={s} />;
  };

  // ------------------------ UI ------------------------
  return (
    <Sidebar>
      <ToastContainer containerId="Admin-Support-Ticket-List" />

      <div className="list-parent-container">

        {/* -------------------- HEADER -------------------- */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">Support Tickets</p>
            <Chip label={`${totalCount || 0} records`} className="overall-chips" />
          </div>

          <div className="search-container">
            <DynamicSearchField
              type="search"
              name=""
              label="Search"
              onChange={setSearchValue}
              disabled={supportTicketListLoading}
            />

            <div className="button-container">

              {/* FILTER DROPDOWN */}
              <select
                value={ticketFilter}
                onChange={(e) => setTicketFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option value="ALL">All Tickets</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>

              {/* NO CREATE BUTTON FOR ADMIN */}

              {/* COLUMN SELECTOR */}
              <div
                className="columnGrid-container"
                onClick={(e) => setColumnAnchorEl(e.currentTarget)}
              >
                <Icon icon="mingcute:column-line" width="20" />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------- TABLE -------------------- */}
        <Paper className="table-container-client">
          <TableContainer>
            <Table stickyHeader className="admin-users-table">
              <TableHead>
                <TableRow>
                  {columns
                    .filter((c) => visibleColumns.includes(c.id))
                    .map((col) => (
                      <TableCell key={col.id}>
                        {col.sortable ? (
                          <TableSortLabel
                            active={sortField === col.id}
                            direction={sortDir}
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
                {supportTicketListLoading ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : tickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  tickets.map((t: any) => (
                    <TableRow hover key={t.id}>

                      {visibleColumns.includes("username") && (
                        <TableCell>
                          {safeValue(t.user?.firstName)} {safeValue(t.user?.lastName)}
                        </TableCell>
                      )}

                      {visibleColumns.includes("subject") && (
                        <TableCell>{safeValue(t.subject)}</TableCell>
                      )}

                      {visibleColumns.includes("issueDescription") && (
                        <TableCell>{safeValue(t.issueDescription)}</TableCell>
                      )}

                      {visibleColumns.includes("ticketStatus") && (
                        <TableCell>{ticketStatusChip(t.ticketStatus)}</TableCell>
                      )}

                      {visibleColumns.includes("status") && (
                        <TableCell>{statusChip(t.status)}</TableCell>
                      )}

                      {visibleColumns.includes("createdAt") && (
                        <TableCell>{safeValue(t.createdAt)}</TableCell>
                      )}

                      {visibleColumns.includes("createdBy") && (
                        <TableCell>{safeValue(t.createdBy)}</TableCell>
                      )}

                      {visibleColumns.includes("updatedAt") && (
                        <TableCell>{safeValue(t.updatedAt || t.updateAt)}</TableCell>
                      )}

                      {visibleColumns.includes("updatedBy") && (
                        <TableCell>{safeValue(t.updatedBy)}</TableCell>
                      )}

                      <TableCell align="center">
                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, t)}>
                          <MoreVert />
                        </IconButton>
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
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsChange}
              rowsPerPageOptions={[10, 20, 30]}
              backIconButtonProps={{ children: <KeyboardArrowLeft /> }}
              nextIconButtonProps={{ children: <KeyboardArrowRight /> }}
            />
          </div>
        </Paper>

        {/* -------------- ROW ACTION MENU -------------- */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => navigate(`/admin/supportTicket/view/${selectedTicket.id}`)}>
            <Visibility fontSize="small" sx={{ mr: 1 }} /> View
          </MenuItem>

          <MenuItem onClick={() => navigate(`/admin/supportTicket/edit/${selectedTicket.id}`)}>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
        </Menu>

        {/* -------------- COLUMN SELECTOR -------------- */}
        <Menu
          anchorEl={columnAnchorEl}
          open={Boolean(columnAnchorEl)}
          onClose={() => setColumnAnchorEl(null)}
        >
          {columns.map((col) => {
            const checked = visibleColumns.includes(col.id);
            const disableUncheck = checked && visibleColumns.length === 1;

            return (
              <MenuItem
                key={col.id}
                onClick={() => !disableUncheck && handleToggleColumn(col.id)}
                disabled={disableUncheck}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  style={{ marginRight: 8 }}
                />
                {col.label}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Sidebar>
  );
};

export default AdminSupportTicketList;
