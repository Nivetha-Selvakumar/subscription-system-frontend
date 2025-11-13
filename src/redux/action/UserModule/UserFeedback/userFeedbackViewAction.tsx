// actions.js

import {
    USER_FEEDBACK_VIEW_CLEAR,
    USER_FEEDBACK_VIEW_FAILURE,
    USER_FEEDBACK_VIEW_REQUEST,
    USER_FEEDBACK_VIEW_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackViewActionTypes';

export const fechUserFeedbackViewRequest = (payload: any) => ({
    type: USER_FEEDBACK_VIEW_REQUEST,
    payload: payload,
});

export const fechUserFeedbackViewSuccess = (data: string) => ({
    type: USER_FEEDBACK_VIEW_SUCCESS,
    payload: data,
});

export const fechUserFeedbackViewFailure = (error: any) => ({
    type: USER_FEEDBACK_VIEW_FAILURE,
    payload: error,
});

export const fechUserFeedbackViewClear = (data: any) => ({
    type: USER_FEEDBACK_VIEW_CLEAR,
    payload: data,
});