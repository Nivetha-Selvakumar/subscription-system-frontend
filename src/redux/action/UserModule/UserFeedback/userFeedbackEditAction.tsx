// actions.js

import {
    USER_FEEDBACK_EDIT_CLEAR,
    USER_FEEDBACK_EDIT_FAILURE,
    USER_FEEDBACK_EDIT_REQUEST,
    USER_FEEDBACK_EDIT_SUCCESS,
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackEditActionTypes';

export const fechUserFeedbackEditRequest = (payload: any) => ({
    type: USER_FEEDBACK_EDIT_REQUEST,
    payload: payload,
});

export const fechUserFeedbackEditSuccess = (data: string) => ({
    type: USER_FEEDBACK_EDIT_SUCCESS,
    payload: data,
});

export const fechUserFeedbackEditFailure = (error: any) => ({
    type: USER_FEEDBACK_EDIT_FAILURE,
    payload: error,
});

export const fechUserFeedbackEditClear = (data: any) => ({
    type: USER_FEEDBACK_EDIT_CLEAR,
    payload: data,
});