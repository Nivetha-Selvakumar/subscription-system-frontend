// actions.js

import { 
    USER_VIEW_CLEAR, 
    USER_VIEW_FAILURE, 
    USER_VIEW_REQUEST, 
    USER_VIEW_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminUsers/adminViewUserActionType";


export const fetchUserViewRequest = (payload: any) => ({
    type: USER_VIEW_REQUEST,
    payload: payload,
});

export const fetchUserViewSuccess = (data: string) => ({
    type: USER_VIEW_SUCCESS,
    payload: data,
});

export const fetchUserViewFailure = (error: any) => ({
    type: USER_VIEW_FAILURE,
    payload: error,
});
export const fetchUserViewClear = (data: any) => ({
    type: USER_VIEW_CLEAR,
    payload: data,
});
