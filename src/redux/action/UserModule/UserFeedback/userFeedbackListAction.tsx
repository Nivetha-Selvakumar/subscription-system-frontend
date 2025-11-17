// actions.js

import {
    USER_FEEDBACK_LIST_CLEAR,
    USER_FEEDBACK_LIST_FAILURE,
    USER_FEEDBACK_LIST_REQUEST,
    USER_FEEDBACK_LIST_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes';

export const fetchUserFeedbackListRequest = (payload: any) => ({
    type: USER_FEEDBACK_LIST_REQUEST,
    payload: payload,
});

export const fetchUserFeedbackListSuccess = (data: string) => ({
    type: USER_FEEDBACK_LIST_SUCCESS,
    payload: data,
});

export const fetchUserFeedbackListFailure = (error: any) => ({
    type: USER_FEEDBACK_LIST_FAILURE,
    payload: error,
});

export const fetchUserFeedbackListClear = (data: any) => ({
    type: USER_FEEDBACK_LIST_CLEAR,
    payload: data,
});