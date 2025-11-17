// actions.js

import {
    SUBSCRIPTION_PAYMENT_LIST_CLEAR,
    SUBSCRIPTION_PAYMENT_LIST_FAILURE,
    SUBSCRIPTION_PAYMENT_LIST_REQUEST,
    SUBSCRIPTION_PAYMENT_LIST_SUCCESS,
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionPaymentListActionTypes';

export const fetchSubscriptionPaymentListRequest = (payload: any) => ({
    type: SUBSCRIPTION_PAYMENT_LIST_REQUEST,
    payload: payload,
});

export const fetchSubscriptionPaymentListSuccess = (data: string) => ({
    type: SUBSCRIPTION_PAYMENT_LIST_SUCCESS,
    payload: data,
});

export const fetchSubscriptionPaymentListFailure = (error: any) => ({
    type: SUBSCRIPTION_PAYMENT_LIST_FAILURE,
    payload: error,
});

export const fetchSubscriptionPaymentListClear = (data: any) => ({
    type: SUBSCRIPTION_PAYMENT_LIST_CLEAR,
    payload: data,
});