// reducers.js

import { USER_LIST_CLEAR, USER_LIST_FAILURE, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../../../actionTypes/AdminModule/AdminUsers/adminUsersListActionTypes";


const initialState = {
    userList: null,
    userListLoading: false,
    error: null,
};

const userListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                ...state,
                userList: null,
                userListLoading: true,
                error: null,
            };
        case USER_LIST_SUCCESS:
            return {
                ...state,
                userList: action.payload,
                userListLoading: false,
                error: null,
            };
        case USER_LIST_FAILURE:
            return {
                ...state,
                userList: null,
                userListLoading: false,
                error: action.payload,
            };

        case USER_LIST_CLEAR:
            return {
                userList: null,
                userListLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userListReducer;