// reducers.js

import {
    USER_DELETE_CLEAR,
    USER_DELETE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS
} from "../../../actionTypes/AdminModule/AdminUsers/adminDeleteUserActionType";


const initialState = {
    userDelete: null,
    userDeleteLoading: false,
    error: null,
};

const userDeleteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                ...state,
                userDelete: null,
                userDeleteLoading: true,
                error: null,
            };
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                userDelete: action.payload,
                userDeleteLoading: false,
                error: null,
            };
        case USER_DELETE_FAILURE:
            return {
                ...state,
                userDelete: null,
                userDeleteLoading: false,
                error: action.payload,
            };

        case USER_DELETE_CLEAR:
            return {
                userDelete: null,
                userDeleteLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userDeleteReducer;