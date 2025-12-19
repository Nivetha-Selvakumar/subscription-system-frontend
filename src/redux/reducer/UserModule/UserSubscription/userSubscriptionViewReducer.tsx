// reducers.js
import {
    SUBSCRIPTION_VIEW_CLEAR,
    SUBSCRIPTION_VIEW_FAILURE,
    SUBSCRIPTION_VIEW_REQUEST,
    SUBSCRIPTION_VIEW_SUCCESS,  
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionViewActionTypes';


const initialState = {
    subscriptionView: null,
    subscriptionViewLoading: false,
    error: null,
};

const subscriptionViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIPTION_VIEW_REQUEST:
            return {
                ...state,
                subscriptionView: null,
                subscriptionViewLoading: true,
                error: null,
            };
        case SUBSCRIPTION_VIEW_SUCCESS:
            return {
                ...state,
                subscriptionView: action.payload,
                subscriptionViewLoading: false,
                error: null,
            };
        case SUBSCRIPTION_VIEW_FAILURE:
            return {
                ...state,
                subscriptionView: null,
                subscriptionViewLoading: false,
                error: action.payload,
            };

        case SUBSCRIPTION_VIEW_CLEAR:
            return {
                subscriptionView: null,
                subscriptionViewLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriptionViewReducer;
