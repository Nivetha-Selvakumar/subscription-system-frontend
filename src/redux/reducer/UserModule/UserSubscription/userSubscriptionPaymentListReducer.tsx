// reducers.js
import {
    SUBSCRIPTION_PAYMENT_LIST_CLEAR,
    SUBSCRIPTION_PAYMENT_LIST_FAILURE,
    SUBSCRIPTION_PAYMENT_LIST_REQUEST,
    SUBSCRIPTION_PAYMENT_LIST_SUCCESS,  
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionPaymentListActionTypes';


const initialState = {
    subscriptionPaymentList: null,
    subscriptionPaymentListLoading: false,
    error: null,
};

const subscriptionPaymentListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIPTION_PAYMENT_LIST_REQUEST:
            return {
                ...state,
                subscriptionPaymentList: null,
                subscriptionPaymentListLoading: true,
                error: null,
            };
        case SUBSCRIPTION_PAYMENT_LIST_SUCCESS:
            return {
                ...state,
                subscriptionPaymentList: action.payload,
                subscriptionPaymentListLoading: false,
                error: null,
            };
        case SUBSCRIPTION_PAYMENT_LIST_FAILURE:
            return {
                ...state,
                subscriptionPaymentList: null,
                subscriptionPaymentListLoading: false,
                error: action.payload,
            };

        case SUBSCRIPTION_PAYMENT_LIST_CLEAR:
            return {
                subscriptionPaymentList: null,
                subscriptionPaymentListLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriptionPaymentListReducer;
