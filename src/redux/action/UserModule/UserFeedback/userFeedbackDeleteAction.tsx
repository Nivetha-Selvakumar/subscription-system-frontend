// actions.js

import {
    USER_FEEDBACK_DELETE_CLEAR,
    USER_FEEDBACK_DELETE_FAILURE,
    USER_FEEDBACK_DELETE_REQUEST,
    USER_FEEDBACK_DELETE_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackDeleteActionTypes';

export const fechUserFeedbackDeleteRequest = (payload: any) => ({
    type: USER_FEEDBACK_DELETE_REQUEST,
    payload: payload,
});

export const fechUserFeedbackDeleteSuccess = (data: string) => ({
    type: USER_FEEDBACK_DELETE_SUCCESS,
    payload: data,
});

export const fechUserFeedbackDeleteFailure = (error: any) => ({
    type: USER_FEEDBACK_DELETE_FAILURE,
    payload: error,
});

export const fechUserFeedbackDeleteClear = (data: any) => ({
    type: USER_FEEDBACK_DELETE_CLEAR,
    payload: data,
});