// actions.js

import {
    USER_FEEDBACK_DELETE_CLEAR,
    USER_FEEDBACK_DELETE_FAILURE,
    USER_FEEDBACK_DELETE_REQUEST,
    USER_FEEDBACK_DELETE_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackDeleteActionTypes';

export const fetchUserFeedbackDeleteRequest = (payload: any) => ({
    type: USER_FEEDBACK_DELETE_REQUEST,
    payload: payload,
});

export const fetchUserFeedbackDeleteSuccess = (data: string) => ({
    type: USER_FEEDBACK_DELETE_SUCCESS,
    payload: data,
});

export const fetchUserFeedbackDeleteFailure = (error: any) => ({
    type: USER_FEEDBACK_DELETE_FAILURE,
    payload: error,
});

export const fetchUserFeedbackDeleteClear = (data: any) => ({
    type: USER_FEEDBACK_DELETE_CLEAR,
    payload: data,
});