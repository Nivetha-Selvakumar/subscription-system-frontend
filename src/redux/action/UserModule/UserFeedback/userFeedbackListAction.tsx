// actions.js

import {
    USER_FEEDBACK_LIST_CLEAR,
    USER_FEEDBACK_LIST_FAILURE,
    USER_FEEDBACK_LIST_REQUEST,
    USER_FEEDBACK_LIST_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes';

export const fechUserFeedbackListRequest = (payload: any) => ({
    type: USER_FEEDBACK_LIST_REQUEST,
    payload: payload,
});

export const fechUserFeedbackListSuccess = (data: string) => ({
    type: USER_FEEDBACK_LIST_SUCCESS,
    payload: data,
});

export const fechUserFeedbackListFailure = (error: any) => ({
    type: USER_FEEDBACK_LIST_FAILURE,
    payload: error,
});

export const fechUserFeedbackListClear = (data: any) => ({
    type: USER_FEEDBACK_LIST_CLEAR,
    payload: data,
});