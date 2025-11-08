// actions.js

import {
    SIGNUP_USER_CLEAR,
    SIGNUP_USER_FAILURE,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,  
} from '../../actionTypes/SignUpPage/SignupActionTypes';

export const signupUserRequest = (payload: any) => ({
    type: SIGNUP_USER_REQUEST,
    payload: payload,
});

export const signupUserSuccess = (data: string) => ({
    type: SIGNUP_USER_SUCCESS,
    payload: data,
});

export const signupUserFailure = (error: any) => ({
    type: SIGNUP_USER_FAILURE,
    payload: error,
});

export const signupUserClear = (data: any) => ({
    type: SIGNUP_USER_CLEAR,
    payload: data,
});