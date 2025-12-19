// actions.js

import {
    USER_FEEDBACK_VIEW_CLEAR,
    USER_FEEDBACK_VIEW_FAILURE,
    USER_FEEDBACK_VIEW_REQUEST,
    USER_FEEDBACK_VIEW_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackViewActionTypes';

export const fetchUserFeedbackViewRequest = (payload: any) => ({
    type: USER_FEEDBACK_VIEW_REQUEST,
    payload: payload,
});

export const fetchUserFeedbackViewSuccess = (data: string) => ({
    type: USER_FEEDBACK_VIEW_SUCCESS,
    payload: data,
});

export const fetchUserFeedbackViewFailure = (error: any) => ({
    type: USER_FEEDBACK_VIEW_FAILURE,
    payload: error,
});

export const fetchUserFeedbackViewClear = (data: any) => ({
    type: USER_FEEDBACK_VIEW_CLEAR,
    payload: data,
});