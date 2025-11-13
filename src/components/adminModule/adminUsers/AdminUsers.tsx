"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Chip,
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
  Button,
} from "@mui/material";
import {
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Add,
  FilterList,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminUsersListActionTypes";
import Sidebar from "../../layout/sideBar";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import UserFilterModal from "./UserListFilter";
import { ToastContainer } from "react-toastify";

const AdminUsers: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("firstName");
  const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterData, setFilterData] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const { userListLoading, userList } = useSelector(
    (state: any) => state.userListReducer
  );

  const { userDelete } = useSelector(
    (state: any) => state.userDeleteReducer
  );

  const users = userList?.userDetails?.userDetails || [];
  const totalCount = userList?.userDetails?.totalCount || 0;

  const allColumns = [
    { id: "firstName", label: "User Name", sortable: true },
    { id: "email", label: "Email", sortable: true },
    { id: "phoneNumber", label: "Phone", sortable: true },
    { id: "address", label: "Address" },
    { id: "dob", label: "DOB", sortable: true },
    { id: "sex", label: "Gender" },
    { id: "role", label: "Role", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "salary", label: "Salary" },
    { id: "joinDate", label: "Join Date" },
    { id: "currentSubStatus", label: "Subscription" },
    { id: "subStartDate", label: "Sub Start Date" },
    { id: "subEndDate", label: "Sub End Date" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(allColumns);

  const handleToggleColumn = (colId: string) => {
    if (visibleColumns.some((c) => c.id === colId)) {
      setVisibleColumns(visibleColumns.filter((c) => c.id !== colId));
    } else {
      const col = allColumns.find((c) => c.id === colId);
      if (col) setVisibleColumns([...visibleColumns, col]);
    }
  };

  // ✅ Memoized – will only recreate when values change
  const fetchUserList = useCallback(() => {
    const payload: any = {
      search: searchValue,
      sortBy: sortField,
      sortDir: sortOrdered,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    };

    const filterPairs: string[] = [];

    if (filterData.role) filterPairs.push(`role:${filterData.role}`);
    if (filterData.gender) filterPairs.push(`sex:${filterData.gender}`);
    if (filterData.status) filterPairs.push(`status:${filterData.status}`);
    if (filterData.salary) filterPairs.push(`salary:${filterData.salary}`);
    if (filterData.joinDate) filterPairs.push(`joinDate:${filterData.joinDate}`);
    if (filterData.currentSubStatus)
      filterPairs.push(`currentSubStatus:${filterData.currentSubStatus}`);
    if (filterData.subStartDate)
      filterPairs.push(`subStartDate:${filterData.subStartDate}`);
    if (filterData.subEndDate)
      filterPairs.push(`subEndDate:${filterData.subEndDate}`);

    const filterBy = filterPairs.length ? filterPairs.join(",") : null;

    dispatch({
      type: USER_LIST_REQUEST,
      payload: { ...payload, filterBy },
    });
  }, [
    searchValue,
    sortField,
    sortOrdered,
    page,
    rowsPerPage,
    filterData,
    dispatch,
  ]);

  // 👇 Now useEffect can safely depend on fetchUserList
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList,userDelete]);

  const handleFilterChange = (newFilter: any) => {
    setFilterData(newFilter);
    setPage(0);
  };

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };
  const handleColumnMenuClose = () => setColumnMenuAnchorEl(null);

  const handleSearchText = (text: any) => {
    setSearchValue(text);
  };

  const handleAddUser = () => {
    navigate("/admin/create/user");
  };

  // 👇 handle view user
  const handleViewUser = (user: any) => {
    if (!user || !user.userId) return;
    navigate(`/admin/users/view/${user.userId}`);
    handleMenuClose();
  };

  // 👇 handle edit user
  const handleEditUser = (user: any) => {
    if (!user || !user.userId) return;
    navigate(`/admin/users/edit/${user.userId}`);
    handleMenuClose();
  };

  // 👇 handle delete user
  const handleDeleteUser = (user: any) => {
    if (!user || !user.userId) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user "${user.firstName} ${user.lastName}"?`
    );
    if (!confirmDelete) return;

    const adminUserId = localStorage.getItem("user_id"); // logged-in admin’s ID
    const payload = {
      userId: adminUserId, // from localStorage (header requirement)
      targetUserId: user.userId, // from the row
    };

    dispatch({
      type: "USER_DELETE_REQUEST",
      payload,
    });

    handleMenuClose();
  };


  const safeValue = (val: any) =>
    val === null || val === undefined || val === "" ? "-" : val;

  return (
    <Sidebar>
      <ToastContainer containerId={"User-List"} />
      <div className="list-parent-container">
        {/* Header */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">User List</p>
            <Chip
              label={`${totalCount || 0} records`}
              className="overall-chips"
            />
          </div>
          <div className="search-container">
            <DynamicSearchField
              type="search"
              name={""}
              disabled={false || userListLoading}
              label={"Search"}
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
              <Button
                variant="contained"
                startIcon={<Add />}
                className="add-button"
                onClick={() => handleAddUser()}
              >
                Add User
              </Button>
              <div
                className="columnGrid-container"
                onClick={handleColumnMenuOpen}
              >
                <Icon
                  icon="mingcute:column-line"
                  width="20"
                  height="20"
                  style={{
                    color: "#374151",
                    cursor: "pointer",
                  }}
                />
              </div>

              <Menu
                anchorEl={columnMenuAnchorEl}
                open={Boolean(columnMenuAnchorEl)}
                onClose={handleColumnMenuClose}
              >
                {allColumns.map((col) => (
                  <MenuItem
                    key={col.id}
                    onClick={() => handleToggleColumn(col.id)}
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.some((c) => c.id === col.id)}
                      readOnly
                      style={{ marginRight: 8 }}
                    />
                    {col.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-container-client">
          <TableContainer>
            <Table stickyHeader className="admin-users-table">
              <TableHead>
                <TableRow>
                  {visibleColumns.map((col) => (
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
                {userListLoading ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 1} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user: any) => {
                    const userId = user.userId || user.id; // ✅ pick whichever key your backend sends

                    return (
                      <TableRow hover key={userId}>
                        {visibleColumns.map((col) => (
                          <TableCell key={col.id} className="nowrap-cell">
                            {col.id === "firstName"
                              ? `${user.firstName || "-"} ${user.lastName || ""}`.trim()
                              : safeValue(user[col.id])}
                          </TableCell>
                        ))}

                        {/* Actions */}
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, { ...user, userId })}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
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

        {/* Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleViewUser(selectedUser)}>
            <Visibility fontSize="small" sx={{ mr: 1 }} /> View
          </MenuItem>
          <MenuItem onClick={() => handleEditUser(selectedUser)}>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => handleDeleteUser(selectedUser)}>
            <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </div>

      {/* Filter Modal */}
      <UserFilterModal
        isModalOpen={isModalOpen}
        toggleModal={setIsModalOpen}
        onChangeFilter={handleFilterChange}
        initialFilter={filterData}
      />
    </Sidebar>
  );
};

export default AdminUsers;
