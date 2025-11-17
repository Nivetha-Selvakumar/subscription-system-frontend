// actions.js

import {
    SUBSCRIPTION_CANCEL_CLEAR,
    SUBSCRIPTION_CANCEL_FAILURE,
    SUBSCRIPTION_CANCEL_REQUEST,
    SUBSCRIPTION_CANCEL_SUCCESS,
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionCancelActionTypes';

export const fetchSubscriptionCancelRequest = (payload: any) => ({
    type: SUBSCRIPTION_CANCEL_REQUEST,
    payload: payload,
});

export const fetchSubscriptionCancelSuccess = (data: string) => ({
    type: SUBSCRIPTION_CANCEL_SUCCESS,
    payload: data,
});

export const fetchSubscriptionCancelFailure = (error: any) => ({
    type: SUBSCRIPTION_CANCEL_FAILURE,
    payload: error,
});

export const fetchSubscriptionCancelClear = (data: any) => ({
    type: SUBSCRIPTION_CANCEL_CLEAR,
    payload: data,
});