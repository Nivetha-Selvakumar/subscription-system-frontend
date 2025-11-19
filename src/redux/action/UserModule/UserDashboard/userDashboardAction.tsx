// actions.js

import { USER_DASHBOARD_LIST_CLEAR, USER_DASHBOARD_LIST_FAILURE, USER_DASHBOARD_LIST_REQUEST, USER_DASHBOARD_LIST_SUCCESS } from "../../../actionTypes/UserModule/UserDashboard/userDashboardActionTypes";


export const fetchUserDashboardListRequest = (payload: any) => ({
    type: USER_DASHBOARD_LIST_REQUEST,
    payload: payload,
});

export const fetchUserDashboardListSuccess = (data: string) => ({
    type: USER_DASHBOARD_LIST_SUCCESS,
    payload: data,
});

export const fetchUserDashboardListFailure = (error: any) => ({
    type: USER_DASHBOARD_LIST_FAILURE,
    payload: error,
});
export const fetchUserDashboardListClear = (data: any) => ({
    type: USER_DASHBOARD_LIST_CLEAR,
    payload: data,
});
