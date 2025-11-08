// actions.js

import {
    USER_CREATE_CLEAR,
    USER_CREATE_FAILURE,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,  
} from '../../../actionTypes/AdminModule/AdminUsers/adminCreateActionType';

export const userCreateRequest = (payload: any) => ({
    type: USER_CREATE_REQUEST,
    payload: payload,
});

export const userCreateSuccess = (data: string) => ({
    type: USER_CREATE_SUCCESS,
    payload: data,
});

export const userCreateFailure = (error: any) => ({
    type: USER_CREATE_FAILURE,
    payload: error,
});

export const userCreateClear = (data: any) => ({
    type: USER_CREATE_CLEAR,
    payload: data,
});