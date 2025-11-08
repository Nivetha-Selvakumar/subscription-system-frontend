// reducers.js
import {
    USER_CREATE_CLEAR,
    USER_CREATE_FAILURE,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,  
} from '../../../actionTypes/AdminModule/AdminUsers/adminCreateActionType';


const initialState = {
    userCreate: null,
    userCreateLoading: false,
    error: null,
};

const userCreateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return {
                ...state,
                userCreate: null,
                userCreateLoading: true,
                error: null,
            };
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                userCreate: action.payload,
                userCreateLoading: false,
                error: null,
            };
        case USER_CREATE_FAILURE:
            return {
                ...state,
                userCreate: null,
                userCreateLoading: false,
                error: action.payload,
            };

        case USER_CREATE_CLEAR:
            return {
                userCreate: null,
                userCreateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userCreateReducer;
