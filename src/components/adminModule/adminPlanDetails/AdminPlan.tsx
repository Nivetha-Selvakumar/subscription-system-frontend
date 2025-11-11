
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TablePagination,
//   IconButton,
//   Menu,
//   MenuItem,
//   Button,
//   Chip,
//   Popover,
//   TextField,
// } from "@mui/material";
// import {
//   MoreVert,
//   Edit,
//   Delete,
//   Add,
//   Visibility,
//   FilterList,
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { PLAN_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes";
// import Sidebar from "../../layout/sideBar";
// import { useNavigate } from "react-router-dom";
// import "../../../styles/AdminModule/AdminUser/userList.scss";
// import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
// import { Icon } from "@iconify/react";
// import PlanFilterModal from "./PlanFilterModal";

// const columns = [
//   { id: "planName", label: "Plan Name", sortable: true },
//   { id: "planType", label: "Plan Type", sortable: true },
//   { id: "cost", label: "Cost", sortable: true },
// ];

// const AdminPlan: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchValue, setSearchValue] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortField, setSortField] = useState("planName");
//   const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("asc");
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedPlan, setSelectedPlan] = useState<any>(null);
//   const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(columns.map(c => c.id));
//   const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(null);
//   const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
//   const [pendingSearch, setPendingSearch] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filterData, setFilterData] = useState<any>({});

//   const { planListLoading, planList } = useSelector((state: any) => state.planListReducer);
//   const plans = planList?.planDetails?.planDetails || [];
//   const totalCount = planList?.planDetails?.totalCount || 0;

//   const fetchPlanList = () => {
//     const payload: any = {
//       search: searchValue,
//       sort: `${sortField}:${sortOrdered}`,
//       // Compose filter similar to users list "key:value" pairs, comma-separated
//       filter: (() => {
//         const pairs: string[] = [];
//         if (filterData.planType) pairs.push(`planType:${filterData.planType}`);
//         if (filterData.status) pairs.push(`status:${filterData.status}`);
//         if (filterData.costMin) pairs.push(`costMin:${filterData.costMin}`);
//         if (filterData.costMax) pairs.push(`costMax:${filterData.costMax}`);
//         return pairs.length ? pairs.join(",") : null;
//       })(),
//       offset: page * rowsPerPage,
//       limit: rowsPerPage,
//     };
//     dispatch({ type: PLAN_LIST_REQUEST, payload });
//   };

//   useEffect(() => {
//     fetchPlanList();
//     // eslint-disable-next-line
//   }, [page, rowsPerPage, sortField, sortOrdered, searchValue, filterData]);

//   const handleChangePage = (_: any, newPage: number) => setPage(newPage);
//   const handleChangeRowsPerPage = (event: any) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const handleSort = (field: string) => {
//     const isAsc = sortField === field && sortOrdered === "asc";
//     setSortField(field);
//     setSortOrdered(isAsc ? "desc" : "asc");
//   };
//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, plan: any) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedPlan(plan);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedPlan(null);
//   };
//   const handleAddPlan = () => {
//     navigate("/admin/create/plan");
//   };
//   const handleToggleColumn = (id: string) => {
//     setVisibleColumnIds(prev => {
//       const exists = prev.includes(id);
//       if (exists) {
//         if (prev.length === 1) return prev;
//         return prev.filter(cid => cid !== id);
//       }
//       return [...prev, id];
//     });
//   };
//   const handleOpenColumns = (e: React.MouseEvent<HTMLElement>) => setColumnAnchorEl(e.currentTarget);
//   const handleCloseColumns = () => setColumnAnchorEl(null);
//   // const handleOpenFilter = (e: React.MouseEvent<HTMLElement>) => {
//   //   setPendingSearch(searchValue);
//   //   setFilterAnchorEl(e.currentTarget);
//   // };
//   const handleCloseFilter = () => setFilterAnchorEl(null);
//   const handleApplyFilter = () => {
//     setSearchValue(pendingSearch);
//     handleCloseFilter();
//   };
//   const handleClearFilter = () => {
//     setPendingSearch("");
//     setSearchValue("");
//     handleCloseFilter();
//   };
//   const handleFilterChange = (newFilter: any) => {
//     setFilterData(newFilter);
//     setPage(0);
//   };
//   const handleViewPlan = (plan: any) => {
//     // TODO: navigate to view plan page
//     alert("View Plan functionality not implemented yet.");
//     handleMenuClose();
//   };
//   const handleEditPlan = (plan: any) => {
//     // TODO: navigate to edit plan page
//     alert("Edit Plan functionality not implemented yet.");
//     handleMenuClose();
//   };
//   const handleDeletePlan = (plan: any) => {
//     // TODO: dispatch delete plan action
//     alert("Delete Plan functionality not implemented yet.");
//     handleMenuClose();
//   };
//   const handleSearchText = (text: any) => {
//     setSearchValue(text);
//     setPage(0);
//   };
//   const safeValue = (val: any) => (val === null || val === undefined || val === "" ? "-" : val);

//   return (
//     <Sidebar>
//       <div className="list-parent-container">
//         {/* Header */}
//         <div className="header-container">
//           <div className="chip-container">
//             <p className="department-text">Plan List</p>
//             <Chip label={`${totalCount || 0} records`} className="overall-chips" />
//           </div>
//           <div className="search-container">
//             <DynamicSearchField
//               type="search"
//               name={""}
//               disabled={false || planListLoading}
//               label={"Search"}
//               onChange={handleSearchText}
//             />
//             <div className="button-container">
//               <Button
//                 variant="outlined"
//                 startIcon={<FilterList />}
//                 className="filter-button"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Filters
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 className="add-button"
//                 onClick={handleAddPlan}
//               >
//                 Add Plan
//               </Button>
//               <div className="columnGrid-container" onClick={handleOpenColumns}>
//                 <Icon
//                   icon="mingcute:column-line"
//                   width="20"
//                   height="20"
//                   style={{ color: "#374151", cursor: "pointer" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Table */}
//         <div className="table-container-client">
//           <TableContainer>
//             <Table stickyHeader className="admin-users-table">
//               <TableHead>
//                 <TableRow>
//                   {columns.filter(c => visibleColumnIds.includes(c.id)).map(col => (
//                     <TableCell key={col.id}>
//                       {col.sortable ? (
//                         <TableSortLabel
//                           active={sortField === col.id}
//                           direction={sortOrdered}
//                           onClick={() => handleSort(col.id)}
//                         >
//                           {col.label}
//                         </TableSortLabel>
//                       ) : (
//                         col.label
//                       )}
//                     </TableCell>
//                   ))}
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {planListLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={visibleColumnIds.length + 1} align="center">
//                       Loading...
//                     </TableCell>
//                   </TableRow>
//                 ) : plans.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={visibleColumnIds.length + 1} align="center">
//                       No plans found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   plans.map((plan: any) => (
//                     <TableRow hover key={plan.planId || plan.id}>
//                       {columns.filter(c => visibleColumnIds.includes(c.id)).map(col => (
//                         <TableCell key={col.id}>{safeValue(plan[col.id])}</TableCell>
//                       ))}
//                       <TableCell align="center">
//                         <IconButton size="small" onClick={e => handleMenuOpen(e, plan)}>
//                           <MoreVert />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* Pagination */}
//           <div className="pagination-container">
//             <TablePagination
//               component="div"
//               count={totalCount}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               rowsPerPageOptions={[
//                 { value: 10, label: "10 Records" },
//                 { value: 20, label: "20 Records" },
//                 { value: 30, label: "30 Records" },
//               ]}
//               labelRowsPerPage=""
//               backIconButtonProps={{ children: <KeyboardArrowLeft /> }}
//               nextIconButtonProps={{ children: <KeyboardArrowRight /> }}
//             />
//           </div>
//         </div>
//         {/* Actions Menu */}
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={() => handleViewPlan(selectedPlan)}>
//             <Visibility fontSize="small" sx={{ mr: 1 }} /> View
//           </MenuItem>
//           <MenuItem onClick={() => handleEditPlan(selectedPlan)}>
//             <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
//           </MenuItem>
//           <MenuItem onClick={() => handleDeletePlan(selectedPlan)}>
//             <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
//           </MenuItem>
//         </Menu>
//         <Menu anchorEl={columnAnchorEl} open={Boolean(columnAnchorEl)} onClose={handleCloseColumns}>
//           {columns.map(col => {
//             const checked = visibleColumnIds.includes(col.id);
//             const disableUncheck = checked && visibleColumnIds.length === 1;
//             return (
//               <MenuItem
//                 key={col.id}
//                 onClick={() => !disableUncheck && handleToggleColumn(col.id)}
//                 disabled={disableUncheck}
//               >
//                 <input
//                   type="checkbox"
//                   checked={checked}
//                   readOnly
//                   style={{ marginRight: 8 }}
//                 />
//                 {col.label}
//               </MenuItem>
//             );
//           })}
//         </Menu>
//         <Popover
//           open={Boolean(filterAnchorEl)}
//           anchorEl={filterAnchorEl}
//           onClose={handleCloseFilter}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{ style: { padding: 16, width: 300 } }}
//         >
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             <TextField
//               size="small"
//               label="Search"
//               placeholder="Search plans"
//               value={pendingSearch}
//               onChange={e => setPendingSearch(e.target.value)}
//             />
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
//               <Button onClick={handleClearFilter}>Clear</Button>
//               <Button variant="contained" onClick={handleApplyFilter}>
//                 Apply
//               </Button>
//             </div>
//           </div>
//         </Popover>

//         {/* Filter Modal (mirrors Admin Users) */}
//         <PlanFilterModal
//           isModalOpen={isModalOpen}
//           toggleModal={setIsModalOpen}
//           onChangeFilter={handleFilterChange}
//           initialFilter={filterData}
//         />
//       </div>
//     </Sidebar>
//   );
// };

// export default AdminPlan;

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
  Button,
  Chip,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Add,
  Visibility,
  FilterList,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { PLAN_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes";
import Sidebar from "../../layout/sideBar";
import { useNavigate } from "react-router-dom";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicSearchField from "../../../common-components/ui/dynamicSearchField";
import { Icon } from "@iconify/react";
import PlanFilterModal from "./PlanFilterModal";
import { ToastContainer } from "react-toastify";

const AdminPlan: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Table & filter states
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("planName");
  const [sortOrdered, setSortOrdered] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState<any>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "planName",
    "planType",
    "planCost",
    "status",
    "description",
    "createdBy",
    "createdAt",
  ]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // 🔹 Redux states
  const { planListLoading, planList } = useSelector(
    (state: any) => state.planListReducer || {}
  );

  // 🔹 Extract data safely
  const plans = planList?.data?.data || [];
  const totalCount = planList?.data?.totalCount || 0;

  // 🔹 Table column definitions
  const allColumns = [
    { id: "planName", label: "Plan Name", sortable: true },
    { id: "planType", label: "Plan Type", sortable: true },
    { id: "planCost", label: "Cost (₹)", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "description", label: "Description" },
    { id: "createdBy", label: "Created By" },
    { id: "createdAt", label: "Created On", sortable: true },
    { id: "updatedBy", label: "Updated By" },
    { id: "updatedAt", label: "Updated On", sortable: true },
  ];

  // 🔹 Fetch Plan List API
  const fetchPlanList = () => {
    const payload: any = {
      search: searchValue,
      sortBy: sortField,
      sortDir: sortOrdered,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    };

    // Add filters if available
    const filterPairs: string[] = [];
    if (filterData.planType) filterPairs.push(`planType:${filterData.planType}`);
    if (filterData.status) filterPairs.push(`status:${filterData.status}`);
    if (filterData.costMin) filterPairs.push(`costMin:${filterData.costMin}`);
    if (filterData.costMax) filterPairs.push(`costMax:${filterData.costMax}`);

    const filterBy = filterPairs.length ? filterPairs.join(",") : null;
    dispatch({ type: PLAN_LIST_REQUEST, payload: { ...payload, filterBy } });
  };

  useEffect(() => {
    fetchPlanList();
  }, [page, rowsPerPage, sortField, sortOrdered, searchValue, filterData]);

  // 🔹 Handlers
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
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, plan: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlan(plan);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPlan(null);
  };
  const handleAddPlan = () => navigate("/admin/create/plan");

  // 🔹 Column toggling
  const handleToggleColumn = (id: string) => {
    setVisibleColumns((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        if (prev.length === 1) return prev;
        return prev.filter((cid) => cid !== id);
      }
      return [...prev, id];
    });
  };

  const handleColumnMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setColumnAnchorEl(e.currentTarget);
  const handleColumnMenuClose = () => setColumnAnchorEl(null);

  const handleFilterChange = (newFilter: any) => {
    setFilterData(newFilter);
    setPage(0);
  };

  const handleViewPlan = (plan: any) => {
    navigate(`/admin/plans/view/${plan.id}`);
    handleMenuClose();
  };

  const handleEditPlan = (plan: any) => {
    navigate(`/admin/plans/edit/${plan.id}`);
    handleMenuClose();
  };

  const handleDeletePlan = (plan: any) => {
    if (!plan?.id) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the plan "${plan.planName}"?`
    );
    if (!confirmDelete) return;

    const adminId = localStorage.getItem("user_id");
    const payload = { userId: adminId, targetPlanId: plan.id };
    dispatch({ type: "PLAN_DELETE_REQUEST", payload });
    handleMenuClose();
  };

  const handleSearchText = (text: any) => {
    setSearchValue(text);
    setPage(0);
  };

  const safeValue = (val: any) =>
    val === null || val === undefined || val === "" ? "-" : val;

  return (
    <Sidebar>
      <ToastContainer containerId={"Plan-List"} />
      <div className="list-parent-container">
        {/* Header */}
        <div className="header-container">
          <div className="chip-container">
            <p className="department-text">Plan List</p>
            <Chip label={`${totalCount || 0} records`} className="overall-chips" />
          </div>
          <div className="search-container">
            <DynamicSearchField
              type="search"
              name={""}
              disabled={false || planListLoading}
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
                onClick={handleAddPlan}
              >
                Add Plan
              </Button>
              <div
                className="columnGrid-container"
                onClick={handleColumnMenuOpen}
              >
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

        {/* Table */}
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
                {planListLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      align="center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : plans.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      align="center"
                    >
                      No plans found
                    </TableCell>
                  </TableRow>
                ) : (
                  plans.map((plan: any) => (
                    <TableRow hover key={plan.id}>
                      {allColumns
                        .filter((c) => visibleColumns.includes(c.id))
                        .map((col) => (
                          <TableCell key={col.id}>
                            {col.id === "planCost"
                              ? `₹ ${safeValue(plan[col.id])}`
                              : safeValue(plan[col.id])}
                          </TableCell>
                        ))}
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, plan)}
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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleViewPlan(selectedPlan)}>
            <Visibility fontSize="small" sx={{ mr: 1 }} /> View
          </MenuItem>
          <MenuItem onClick={() => handleEditPlan(selectedPlan)}>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => handleDeletePlan(selectedPlan)}>
            <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>

        {/* Column Selection */}
        <Menu
          anchorEl={columnAnchorEl}
          open={Boolean(columnAnchorEl)}
          onClose={handleColumnMenuClose}
        >
          {allColumns.map((col) => {
            const checked = visibleColumns.includes(col.id);
            const disableUncheck = checked && visibleColumns.length === 1;
            return (
              <MenuItem
                key={col.id}
                onClick={() =>
                  !disableUncheck && handleToggleColumn(col.id)
                }
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

        {/* Filter Modal */}
        <PlanFilterModal
          isModalOpen={isModalOpen}
          toggleModal={setIsModalOpen}
          onChangeFilter={handleFilterChange}
          initialFilter={filterData}
        />
      </div>
    </Sidebar>
  );
};

export default AdminPlan;
