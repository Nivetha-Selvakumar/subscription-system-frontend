// reducers.js
import {
    SUBSCRIPTION_CANCEL_CLEAR,
    SUBSCRIPTION_CANCEL_FAILURE,
    SUBSCRIPTION_CANCEL_REQUEST,
    SUBSCRIPTION_CANCEL_SUCCESS,  
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionCancelActionTypes';


const initialState = {
    subscriptionCancel: null,
    subscriptionCancelLoading: false,
    error: null,
};

const subscriptionCancelReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIPTION_CANCEL_REQUEST:
            return {
                ...state,
                subscriptionCancel: null,
                subscriptionCancelLoading: true,
                error: null,
            };
        case SUBSCRIPTION_CANCEL_SUCCESS:
            return {
                ...state,
                subscriptionCancel: action.payload,
                subscriptionCancelLoading: false,
                error: null,
            };
        case SUBSCRIPTION_CANCEL_FAILURE:
            return {
                ...state,
                subscriptionCancel: null,
                subscriptionCancelLoading: false,
                error: action.payload,
            };

        case SUBSCRIPTION_CANCEL_CLEAR:
            return {
                subscriptionCancel: null,
                subscriptionCancelLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriptionCancelReducer;
