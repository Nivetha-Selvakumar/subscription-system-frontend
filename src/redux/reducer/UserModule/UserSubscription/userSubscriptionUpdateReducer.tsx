// reducers.js
import {
    SUBSCRIPTION_UPDATE_CLEAR,
    SUBSCRIPTION_UPDATE_FAILURE,
    SUBSCRIPTION_UPDATE_REQUEST,
    SUBSCRIPTION_UPDATE_SUCCESS,  
} from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionUpdateActionTypes';


const initialState = {
    subscriptionUpdate: null,
    subscriptionUpdateLoading: false,
    error: null,
};

const subscriptionUpdateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIPTION_UPDATE_REQUEST:
            return {
                ...state,
                subscriptionUpdate: null,
                subscriptionUpdateLoading: true,
                error: null,
            };
        case SUBSCRIPTION_UPDATE_SUCCESS:
            return {
                ...state,
                subscriptionUpdate: action.payload,
                subscriptionUpdateLoading: false,
                error: null,
            };
        case SUBSCRIPTION_UPDATE_FAILURE:
            return {
                ...state,
                subscriptionUpdate: null,
                subscriptionUpdateLoading: false,
                error: action.payload,
            };

        case SUBSCRIPTION_UPDATE_CLEAR:
            return {
                subscriptionUpdate: null,
                subscriptionUpdateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriptionUpdateReducer;
