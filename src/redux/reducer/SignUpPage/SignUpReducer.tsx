// reducers.js
import {
    SUBSCRIBER_CREATE_CLEAR,
    SUBSCRIBER_CREATE_FAILURE,
    SUBSCRIBER_CREATE_REQUEST,
    SUBSCRIBER_CREATE_SUCCESS,  
} from '../../actionTypes/SignUpPage/SignupActionTypes';


const initialState = {
    subscriberCreate: null,
    subscriberCreateLoading: false,
    error: null,
};

const subscriberCreateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBSCRIBER_CREATE_REQUEST:
            return {
                ...state,
                subscriberCreate: null,
                subscriberCreateLoading: true,
                error: null,
            };
        case SUBSCRIBER_CREATE_SUCCESS:
            return {
                ...state,
                subscriberCreate: action.payload,
                subscriberCreateLoading: false,
                error: null,
            };
        case SUBSCRIBER_CREATE_FAILURE:
            return {
                ...state,
                subscriberCreate: null,
                subscriberCreateLoading: false,
                error: action.payload,
            };

        case SUBSCRIBER_CREATE_CLEAR:
            return {
                subscriberCreate: null,
                subscriberCreateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default subscriberCreateReducer;
