// actions.js

import {
    SUBSCRIPTION_UPDATE_CLEAR,
    SUBSCRIPTION_UPDATE_FAILURE,
    SUBSCRIPTION_UPDATE_REQUEST,
    SUBSCRIPTION_UPDATE_SUCCESS,
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionUpdateActionTypes';

export const fetchSubscriptionUpdateRequest = (payload: any) => ({
    type: SUBSCRIPTION_UPDATE_REQUEST,
    payload: payload,
});

export const fetchSubscriptionUpdateSuccess = (data: string) => ({
    type: SUBSCRIPTION_UPDATE_SUCCESS,
    payload: data,
});

export const fetchSubscriptionUpdateFailure = (error: any) => ({
    type: SUBSCRIPTION_UPDATE_FAILURE,
    payload: error,
});

export const fetchSubscriptionUpdateClear = (data: any) => ({
    type: SUBSCRIPTION_UPDATE_CLEAR,
    payload: data,
});