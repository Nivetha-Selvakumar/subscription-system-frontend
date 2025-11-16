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
  Menu,
  MenuItem,
  Button,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import {

  KeyboardArrowLeft,
  KeyboardArrowRight,
  FilterList,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import FeedbackFilterModal from "./AdminFeedbackListFilter";
import { Icon } from "@iconify/react";
import { USER_FEEDBACK_LIST_REQUEST } from "../../../redux/actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes";

const AdminFeedback: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= STATE ======================
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState<any>({});

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "user",
    "ratings",
    "comments",
    "status",
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
  ]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);

  const { userFeedbackListLoading, userFeedbackList } = useSelector(
    (state: any) => state.userFeedbackListReducer || {}
  );

  const feedbacks = userFeedbackList?.data?.data || [];
  const totalCount = userFeedbackList?.data?.totalCount || 0;

  // ================= COLUMNS ======================
  const allColumns = [
    { id: "user", label: "User Name", sortable: false },
    { id: "ratings", label: "Ratings", sortable: true },
    { id: "comments", label: "Comments", sortable: false },
    { id: "status", label: "Status", sortable: true },
    { id: "createdBy", label: "Created By", sortable: false },
    { id: "createdAt", label: "Created At", sortable: true },
    { id: "updatedBy", label: "Updated By", sortable: false },
    { id: "updatedAt", label: "Updated At", sortable: true },
  ];

  // ================= FETCH FEEDBACK LIST ======================
  const fetchFeedbacks = () => {
    const payload: any = {
      search: searchValue,
      sortBy: sortField,
      sortDir: sortOrdered,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    };

    // Filters
    const filterPairs: string[] = [];

    if (filterData.ratings)
      filterPairs.push(`ratings:${filterData.ratings}`);

    if (filterData.status)
      filterPairs.push(`status:${filterData.status}`);

    if (filterData.startDate)
      filterPairs.push(`startDate:${filterData.startDate}`);

    if (filterData.endDate)
      filterPairs.push(`endDate:${filterData.endDate}`);

    const filterBy = filterPairs.length ? filterPairs.join(",") : null;

    dispatch({
      type: USER_FEEDBACK_LIST_REQUEST,
      payload: { ...payload, filterBy },
    });

  };


  useEffect(() => {
    fetchFeedbacks();
  }, [page, rowsPerPage, sortField, sortOrdered, searchValue, filterData]);

  // ================= HANDLERS ======================
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrdered === "asc";
    setSortField(field);
    setSortOrdered(isAsc ? "desc" : "asc");
  };

  const handleViewFeedback = (feedback: any) => {
    navigate(`/admin/feedback/view/${feedback.id}`);
  };

  const handleColumnMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setColumnAnchorEl(e.currentTarget);

  const handleColumnMenuClose = () => setColumnAnchorEl(null);

  const handleToggleColumn = (id: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // prevent hiding all columns
        return prev.filter((col) => col !== id);
      }
      return [...prev, id];
    });
  };

  const handleSearchText = (text: string) => {
    setSearchValue(text);
    setPage(0);
  };

  const safeValue = (val: any) =>
    val === undefined || val === null || val === "" ? "-" : val;

  return (
    <Sidebar>
      <ToastContainer containerId="Feedback-List" />

      <div className="list-parent-container">
        {/* ------------ HEADER ------------- */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">User Feedback</p>
            <Chip label={`${totalCount || 0} records`} className="overall-chips" />
          </div>

          <div className="search-container">
            <DynamicSearchField
              type="search"
              name={""}
              disabled={false || userFeedbackListLoading}
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

              <div className="columnGrid-container" onClick={handleColumnMenuOpen}>
                <Icon
                  icon="mingcute:column-line"
                  width="20"
                  style={{ color: "#374151", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ------------ TABLE ------------- */}
        <div className="table-container-client">
          <TableContainer>
            <Table stickyHeader className="admin-users-table">
              <TableHead>
                <TableRow>
                  {allColumns
                    .filter((col) => visibleColumns.includes(col.id))
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
                {userFeedbackListLoading ? (
                  <TableRow>
                    <TableCell align="center" colSpan={visibleColumns.length + 1}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : feedbacks.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={visibleColumns.length + 1}>
                      No feedback found
                    </TableCell>
                  </TableRow>
                ) : (
                  feedbacks.map((fb: any) => (
                    <TableRow key={fb.id} hover>
                      {visibleColumns.includes("user") && (
                        <TableCell>
                          {fb?.user?.firstName} {fb?.user?.lastName}
                        </TableCell>
                      )}

                      {visibleColumns.includes("ratings") && (
                        <TableCell>{safeValue(fb.ratings)}</TableCell>
                      )}

                      {visibleColumns.includes("comments") && (
                        <TableCell>{safeValue(fb.comments)}</TableCell>
                      )}

                      {visibleColumns.includes("status") && (
                        <TableCell>{safeValue(fb.status)}</TableCell>
                      )}

                      {visibleColumns.includes("createdBy") && (
                        <TableCell>{safeValue(fb.createdBy)}</TableCell>
                      )}

                      {visibleColumns.includes("createdAt") && (
                        <TableCell>
                          {new Date(fb.createdAt).toLocaleString()}
                        </TableCell>
                      )}
                      {visibleColumns.includes("updatedBy") && (
                        <TableCell>
                          <TableCell>{safeValue(fb.updatedBy)}</TableCell>
                        </TableCell>
                      )}
                      {visibleColumns.includes("updatedAt") && (
                        <TableCell>
                          {new Date(fb.updatedAt).toLocaleString()}
                        </TableCell>
                      )}

                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewFeedback(fb)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>


                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ------------ PAGINATION ------------- */}
          <div className="pagination-container">
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 20, 30]}
              labelRowsPerPage=""
              backIconButtonProps={{ children: <KeyboardArrowLeft /> }}
              nextIconButtonProps={{ children: <KeyboardArrowRight /> }}
            />
          </div>
        </div>

        {/* ------------ COLUMN TOGGLE MENU ------------- */}
        <Menu
          anchorEl={columnAnchorEl}
          open={Boolean(columnAnchorEl)}
          onClose={handleColumnMenuClose}
        >
          {allColumns.map((col) => (
            <MenuItem
              key={col.id}
              onClick={() => handleToggleColumn(col.id)}
              disabled={
                visibleColumns.length === 1 && visibleColumns.includes(col.id)
              }
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.id)}
                readOnly
                style={{ marginRight: 8 }}
              />
              {col.label}
            </MenuItem>
          ))}
        </Menu>

        {/* ------------ FILTER MODAL ------------- */}
        <FeedbackFilterModal
          isModalOpen={isModalOpen}
          toggleModal={setIsModalOpen}
          onChangeFilter={setFilterData}
          initialFilter={filterData}
        />
      </div>
    </Sidebar>
  );
};

export default AdminFeedback;
