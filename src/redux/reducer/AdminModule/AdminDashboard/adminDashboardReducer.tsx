import {
  ADMIN_DASHBOARD_LIST_CLEAR,
  ADMIN_DASHBOARD_LIST_FAILURE,
  ADMIN_DASHBOARD_LIST_REQUEST,
  ADMIN_DASHBOARD_LIST_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminDashboard/adminDashboardActionTypes";

const initialState = {
  adminDashboardList: null,
  adminDashboardListLoading: false,
  error: null,
};

const adminDashboardListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_LIST_REQUEST:
      return {
        ...state,
        adminDashboardList: null,
        adminDashboardListLoading: true,
        error: null,
      };
    case ADMIN_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        adminDashboardList: action.payload,
        adminDashboardListLoading: false,
        error: null,
      };
    case ADMIN_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        adminDashboardList: null,
        adminDashboardListLoading: false,
        error: action.payload,
      };
    case ADMIN_DASHBOARD_LIST_CLEAR:
      return {
        adminDashboardList: null,
        adminDashboardListLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default adminDashboardListReducer;

