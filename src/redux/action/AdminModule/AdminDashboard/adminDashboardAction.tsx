// actions.js

import { ADMIN_DASHBOARD_LIST_CLEAR, ADMIN_DASHBOARD_LIST_FAILURE, ADMIN_DASHBOARD_LIST_REQUEST, ADMIN_DASHBOARD_LIST_SUCCESS } from "../../../actionTypes/AdminModule/AdminDashboard/adminDashboardActionTypes";


export const fetchAdminDashboardListRequest = (payload: any) => ({
    type: ADMIN_DASHBOARD_LIST_REQUEST,
    payload: payload,
});

export const fetchAdminDashboardListSuccess = (data: string) => ({
    type: ADMIN_DASHBOARD_LIST_SUCCESS,
    payload: data,
});

export const fetchAdminDashboardListFailure = (error: any) => ({
    type: ADMIN_DASHBOARD_LIST_FAILURE,
    payload: error,
});
export const fetchAdminDashboardListClear = (data: any) => ({
    type: ADMIN_DASHBOARD_LIST_CLEAR,
    payload: data,
});
