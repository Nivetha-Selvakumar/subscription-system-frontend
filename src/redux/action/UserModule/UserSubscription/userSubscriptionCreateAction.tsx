// actions.js

import {
    SUBSCRIPTION_CREATE_SUCCESS,
    SUBSCRIPTION_CREATE_REQUEST,
    SUBSCRIPTION_CREATE_FAILURE,
    SUBSCRIPTION_CREATE_CLEAR,
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionCreateActionTypes';

export const fetchSubscriptionCreateRequest = (payload: any) => ({
    type: SUBSCRIPTION_CREATE_REQUEST,
    payload: payload,
});

export const fetchSubscriptionCreateSuccess = (data: string) => ({
    type: SUBSCRIPTION_CREATE_SUCCESS,
    payload: data,
});

export const fetchSubscriptionCreateFailure = (error: any) => ({
    type: SUBSCRIPTION_CREATE_FAILURE,
    payload: error,
});

export const fetchSubscriptionCreateClear = (data: any) => ({
    type: SUBSCRIPTION_CREATE_CLEAR,
    payload: data,
});