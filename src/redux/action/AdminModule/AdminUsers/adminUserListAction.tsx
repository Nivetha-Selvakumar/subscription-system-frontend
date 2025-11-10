// actions.js

import { USER_LIST_CLEAR, USER_LIST_FAILURE, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../../../actionTypes/AdminModule/AdminUsers/adminUsersListActionTypes";


export const fetchUserListRequest = (payload: any) => ({
    type: USER_LIST_REQUEST,
    payload: payload,
});

export const fetchUserListSuccess = (data: string) => ({
    type: USER_LIST_SUCCESS,
    payload: data,
});

export const fetchUserListFailure = (error: any) => ({
    type: USER_LIST_FAILURE,
    payload: error,
});
export const fetchUserListClear = (data: any) => ({
    type: USER_LIST_CLEAR,
    payload: data,
});
