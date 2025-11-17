// actions.js

import {
    SUBSCRIPTION_VIEW_CLEAR,
    SUBSCRIPTION_VIEW_FAILURE,
    SUBSCRIPTION_VIEW_REQUEST,
    SUBSCRIPTION_VIEW_SUCCESS,
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionViewActionTypes';

export const fetchSubscriptionViewRequest = (payload: any) => ({
    type: SUBSCRIPTION_VIEW_REQUEST,
    payload: payload,
});

export const fetchSubscriptionViewSuccess = (data: string) => ({
    type: SUBSCRIPTION_VIEW_SUCCESS,
    payload: data,
});

export const fetchSubscriptionViewFailure = (error: any) => ({
    type: SUBSCRIPTION_VIEW_FAILURE,
    payload: error,
});

export const fetchSubscriptionViewClear = (data: any) => ({
    type: SUBSCRIPTION_VIEW_CLEAR,
    payload: data,
});