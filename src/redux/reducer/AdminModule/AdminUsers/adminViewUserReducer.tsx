// reducers.js

import { 
    USER_VIEW_CLEAR, 
    USER_VIEW_FAILURE, 
    USER_VIEW_REQUEST, 
    USER_VIEW_SUCCESS 
} from "../../../actionTypes/AdminModule/AdminUsers/adminViewUserActionType";


const initialState = {
    userView: null,
    userViewLoading: false,
    error: null,
};

const userViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_VIEW_REQUEST:
            return {
                ...state,
                userView: null,
                userViewLoading: true,
                error: null,
            };
        case USER_VIEW_SUCCESS:
            return {
                ...state,
                userView: action.payload,
                userViewLoading: false,
                error: null,
            };
        case USER_VIEW_FAILURE:
            return {
                ...state,
                userView: null,
                userViewLoading: false,
                error: action.payload,
            };

        case USER_VIEW_CLEAR:
            return {
                userView: null,
                userViewLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userViewReducer;