// reducers.js

import {
    USER_EDIT_CLEAR,
    USER_EDIT_FAILURE,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS
} from "../../../actionTypes/AdminModule/AdminUsers/adminEditUserActionType";


const initialState = {
    userEdit: null,
    userEditLoading: false,
    error: null,
};

const userEditReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return {
                ...state,
                userEdit: null,
                userEditLoading: true,
                error: null,
            };
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                userEdit: action.payload,
                userEditLoading: false,
                error: null,
            };
        case USER_EDIT_FAILURE:
            return {
                ...state,
                userEdit: null,
                userEditLoading: false,
                error: action.payload,
            };

        case USER_EDIT_CLEAR:
            return {
                userEdit: null,
                userEditLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userEditReducer;