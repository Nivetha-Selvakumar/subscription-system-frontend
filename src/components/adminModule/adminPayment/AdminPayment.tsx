import React, { useEffect, useState } from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Popover,
  TextField,
} from "@mui/material";
import {
  FilterList,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreVert,
  Visibility,
  GetApp,
} from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";
import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import PaymentFilterModal from "./PaymentFilterModal";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import { PAYMENT_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPayment/adminPaymentListActionTypes";

const columns = [
  { id: "transactionId", label: "Transaction ID", sortable: true },
  { id: "subscriberName", label: "Subscriber", sortable: true },
  { id: "amount", label: "Amount Paid", sortable: true },
  { id: "payment_dt", label: "Payment Date", sortable: true },
  { id: "payment_status", label: "Status", sortable: true },
];

const statusColorMap: Record<string, "success" | "default" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
};

const AdminPayment: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("payment_dt");
  const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("desc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(columns.map(col => col.id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState<any>({});

  const { paymentListLoading, paymentList } = useSelector(
    (state: any) => state.paymentListReducer || {}
  );

  const payments = paymentList?.paymentDetails?.paymentDetails || [];
  const totalCount = paymentList?.paymentDetails?.totalCount || 0;

  const fetchPaymentList = () => {
    const filterPairs: string[] = [];
    if (filterData.status) filterPairs.push(`status:${filterData.status}`);
    if (filterData.startDate) filterPairs.push(`from:${filterData.startDate}`);
    if (filterData.endDate) filterPairs.push(`to:${filterData.endDate}`);

    const payload: any = {
      search: searchValue,
      sort: `${sortField}:${sortOrdered}`,
      filter: filterPairs.length ? filterPairs.join(",") : null,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    };

    dispatch({ type: PAYMENT_LIST_REQUEST, payload });
  };

  useEffect(() => {
    fetchPaymentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortField, sortOrdered, searchValue, filterData]);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, payment: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayment(payment);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPayment(null);
  };

  const handleOpenColumns = (event: React.MouseEvent<HTMLElement>) =>
    setColumnAnchorEl(event.currentTarget);
  const handleCloseColumns = () => setColumnAnchorEl(null);

  const handleToggleColumn = (id: string) => {
    setVisibleColumnIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        if (prev.length === 1) return prev;
        return prev.filter(cid => cid !== id);
      }
      return [...prev, id];
    });
  };

  // const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
  //   setPendingSearch(searchValue);
  //   setFilterAnchorEl(event.currentTarget);
  // };
  const handleCloseFilter = () => setFilterAnchorEl(null);
  const handleApplyFilter = () => {
    setSearchValue(pendingSearch);
    handleCloseFilter();
  };
  const handleClearFilter = () => {
    setPendingSearch("");
    setSearchValue("");
    handleCloseFilter();
  };

  const handleSearchText = (value: string) => {
    setSearchValue(value);
    setPage(0);
  };

  const handleFilterChange = (newFilter: any) => {
    setFilterData(newFilter);
    setPage(0);
  };

  const handleViewPayment = (payment: any) => {
    handleMenuClose();
  };

  const handleDownloadReceipt = (payment: any) => {
    handleMenuClose();
  };

  const safeValue = (value: any) =>
    value === null || value === undefined || value === "" ? "-" : value;

  const renderStatusChip = (statusRaw: string) => {
    const status = (statusRaw || "").toLowerCase();
    const color = statusColorMap[status] || "default";
    const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : "-";
    return <Chip label={label} color={color} variant="outlined" size="small" />;
  };

  return (
    <Sidebar>
      <div className="list-parent-container">
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">Payment List</p>
            <Chip label={`${totalCount || 0} records`} className="overall-chips" />
          </div>
          <div className="search-container">
            <DynamicSearchField
              type="search"
              name=""
              disabled={paymentListLoading}
              label="Search"
              onChange={handleSearchText}
            />
            <div className="button-container">
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                className="filter-button"
                onClick={() => setIsModalOpen(true)}
              >
                Filters
              </Button>
              <div className="columnGrid-container" onClick={handleOpenColumns}>
                <Icon
                  icon="mingcute:column-line"
                  width="20"
                  height="20"
                  style={{ color: "#374151", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-container-client">
          <TableContainer>
            <Table stickyHeader className="admin-users-table">
              <TableHead>
                <TableRow>
                  {columns
                    .filter(column => visibleColumnIds.includes(column.id))
                    .map(column => (
                      <TableCell key={column.id}>
                        {column.sortable ? (
                          <TableSortLabel
                            active={sortField === column.id}
                            direction={sortOrdered}
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          column.label
                        )}
                      </TableCell>
                    ))}
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentListLoading ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumnIds.length + 1} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumnIds.length + 1} align="center">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment: any) => (
                    <TableRow hover key={payment.paymentId || payment.transactionId}>
                      {columns
                        .filter(column => visibleColumnIds.includes(column.id))
                        .map(column => (
                          <TableCell key={column.id} className="nowrap-cell">
                            {column.id === "payment_status"
                              ? renderStatusChip(payment[column.id])
                              : safeValue(payment[column.id])}
                          </TableCell>
                        ))}
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={event => handleMenuOpen(event, payment)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="pagination-container">
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[
                { value: 10, label: "10 Records" },
                { value: 20, label: "20 Records" },
                { value: 30, label: "30 Records" },
              ]}
              labelRowsPerPage=""
              backIconButtonProps={{ children: <KeyboardArrowLeft /> }}
              nextIconButtonProps={{ children: <KeyboardArrowRight /> }}
            />
          </div>
        </div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleViewPayment(selectedPayment)}>
            <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
          </MenuItem>
          <MenuItem onClick={() => handleDownloadReceipt(selectedPayment)}>
            <GetApp fontSize="small" sx={{ mr: 1 }} /> Download Receipt
          </MenuItem>
        </Menu>

        <Menu anchorEl={columnAnchorEl} open={Boolean(columnAnchorEl)} onClose={handleCloseColumns}>
          {columns.map(column => {
            const checked = visibleColumnIds.includes(column.id);
            const disableUncheck = checked && visibleColumnIds.length === 1;
            return (
              <MenuItem
                key={column.id}
                onClick={() => !disableUncheck && handleToggleColumn(column.id)}
                disabled={disableUncheck}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  style={{ marginRight: 8 }}
                />
                {column.label}
              </MenuItem>
            );
          })}
        </Menu>

        <Popover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ style: { padding: 16, width: 300 } }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TextField
              size="small"
              label="Search"
              placeholder="Search payments"
              value={pendingSearch}
              onChange={event => setPendingSearch(event.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <Button onClick={handleClearFilter}>Clear</Button>
              <Button variant="contained" onClick={handleApplyFilter}>
                Apply
              </Button>
            </div>
          </div>
        </Popover>

        <PaymentFilterModal
          isModalOpen={isModalOpen}
          toggleModal={setIsModalOpen}
          onChangeFilter={handleFilterChange}
          initialFilter={filterData}
        />
      </div>
    </Sidebar>
  );
};

export default AdminPayment;