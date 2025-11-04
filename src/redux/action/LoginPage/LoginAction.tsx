// actions.js

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_CLEAR,
} from '../../actionTypes/LoginPage/LoginActionTypes';

export const fetchLoginDataRequest = (payload: any) => ({
    type: FETCH_DATA_REQUEST,
    payload: payload,
});

export const fetchLoginDataSuccess = (data: string) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export const fetchLoginDataFailure = (error: any) => ({
    type: FETCH_DATA_FAILURE,
    payload: error,
});
export const fetchLoginDataClear = (data: any) => ({
    type: FETCH_DATA_CLEAR,
    payload: data,
});
