// reducers.js
import {
    SIGNUP_USER_CLEAR,
    SIGNUP_USER_FAILURE,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,  
} from '../../actionTypes/SignUpPage/SignupActionTypes';


const initialState = {
    signupUser: null,
    signupUserLoading: false,
    error: null,
};

const signupUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                signupUser: null,
                signupUserLoading: true,
                error: null,
            };
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                signupUser: action.payload,
                signupUserLoading: false,
                error: null,
            };
        case SIGNUP_USER_FAILURE:
            return {
                ...state,
                signupUser: null,
                signupUserLoading: false,
                error: action.payload,
            };

        case SIGNUP_USER_CLEAR:
            return {
                signupUser: null,
                signupUserLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default signupUserReducer;
