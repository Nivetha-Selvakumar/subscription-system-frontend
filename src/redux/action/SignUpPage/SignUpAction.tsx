// actions.js

import {
    SUBSCRIBER_CREATE_CLEAR,
    SUBSCRIBER_CREATE_FAILURE,
    SUBSCRIBER_CREATE_REQUEST,
    SUBSCRIBER_CREATE_SUCCESS,  
} from '../../actionTypes/SignUpPage/SignupActionTypes';

export const subscriberCreateRequest = (payload: any) => ({
    type: SUBSCRIBER_CREATE_REQUEST,
    payload: payload,
});

export const subscriberCreateSuccess = (data: string) => ({
    type: SUBSCRIBER_CREATE_SUCCESS,
    payload: data,
});

export const subscriberCreateFailure = (error: any) => ({
    type: SUBSCRIBER_CREATE_FAILURE,
    payload: error,
});

export const subscriberCreateClear = (data: any) => ({
    type: SUBSCRIBER_CREATE_CLEAR,
    payload: data,
});