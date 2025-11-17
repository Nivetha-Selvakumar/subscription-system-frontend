// reducers.js
import {
    SUBSCRIPTION_CREATE_CLEAR,
    SUBSCRIPTION_CREATE_FAILURE,
    SUBSCRIPTION_CREATE_REQUEST,
    SUBSCRIPTION_CREATE_SUCCESS,  
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionCreateActionTypes';


const initialState = {
    subscriptionCreate: null,
    subscriptionCreateLoading: false,
    error: null,
};

const subscriptionCreateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIPTION_CREATE_REQUEST:
            return {
                ...state,
                subscriptionCreate: null,
                subscriptionCreateLoading: true,
                error: null,
            };
        case SUBSCRIPTION_CREATE_SUCCESS:
            return {
                ...state,
                subscriptionCreate: action.payload,
                subscriptionCreateLoading: false,
                error: null,
            };
        case SUBSCRIPTION_CREATE_FAILURE:
            return {
                ...state,
                subscriptionCreate: null,
                subscriptionCreateLoading: false,
                error: action.payload,
            };

        case SUBSCRIPTION_CREATE_CLEAR:
            return {
                subscriptionCreate: null,
                subscriptionCreateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriptionCreateReducer;
