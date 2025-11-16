// actions.js

import {
    USER_FEEDBACK_EDIT_CLEAR,
    USER_FEEDBACK_EDIT_FAILURE,
    USER_FEEDBACK_EDIT_REQUEST,
    USER_FEEDBACK_EDIT_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackEditActionTypes';

export const fetchUserFeedbackEditRequest = (payload: any) => ({
    type: USER_FEEDBACK_EDIT_REQUEST,
    payload: payload,
});

export const fetchUserFeedbackEditSuccess = (data: string) => ({
    type: USER_FEEDBACK_EDIT_SUCCESS,
    payload: data,
});

export const fetchUserFeedbackEditFailure = (error: any) => ({
    type: USER_FEEDBACK_EDIT_FAILURE,
    payload: error,
});

export const fetchUserFeedbackEditClear = (data: any) => ({
    type: USER_FEEDBACK_EDIT_CLEAR,
    payload: data,
});