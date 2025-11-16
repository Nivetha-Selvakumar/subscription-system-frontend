// actions.js

import {
    USER_FEEDBACK_CREATE_CLEAR,
    USER_FEEDBACK_CREATE_FAILURE,
    USER_FEEDBACK_CREATE_REQUEST,
    USER_FEEDBACK_CREATE_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackCreateActionTypes';

export const fetchUserFeedbackCreateRequest = (payload: any) => ({
    type: USER_FEEDBACK_CREATE_REQUEST,
    payload: payload,
});

export const fetchUserFeedbackCreateSuccess = (data: string) => ({
    type: USER_FEEDBACK_CREATE_SUCCESS,
    payload: data,
});

export const fetchUserFeedbackCreateFailure = (error: any) => ({
    type: USER_FEEDBACK_CREATE_FAILURE,
    payload: error,
});

export const fetchUserFeedbackCreateClear = (data: any) => ({
    type: USER_FEEDBACK_CREATE_CLEAR,
    payload: data,
});