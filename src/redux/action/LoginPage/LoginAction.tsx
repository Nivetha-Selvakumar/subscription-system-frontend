// actions.js

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
} from '../../actionTypes/LoginPage/LoginActionTypes';

export const fetchDataRequest = (payload: any) => ({
    type: FETCH_DATA_REQUEST,
    payload: payload,
});

export const fetchDataSuccess = (data: string) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export const fetchDataFailure = (error: any) => ({
    type: FETCH_DATA_FAILURE,
    payload: error,
});
