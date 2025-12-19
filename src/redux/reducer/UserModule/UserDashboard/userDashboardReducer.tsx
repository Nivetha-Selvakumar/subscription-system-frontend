import {
  USER_DASHBOARD_LIST_CLEAR,
  USER_DASHBOARD_LIST_FAILURE,
  USER_DASHBOARD_LIST_REQUEST,
  USER_DASHBOARD_LIST_SUCCESS,
} from "../../../actionTypes/UserModule/UserDashboard/userDashboardActionTypes";

const initialState = {
  userDashboardList: null,
  userDashboardListLoading: false,
  error: null,
};

const userDashboardListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_DASHBOARD_LIST_REQUEST:
      return {
        ...state,
        userDashboardList: null,
        userDashboardListLoading: true,
        error: null,
      };
    case USER_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        userDashboardList: action.payload,
        userDashboardListLoading: false,
        error: null,
      };
    case USER_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        userDashboardList: null,
        userDashboardListLoading: false,
        error: action.payload,
      };
    case USER_DASHBOARD_LIST_CLEAR:
      return {
        userDashboardList: null,
        userDashboardListLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userDashboardListReducer;

