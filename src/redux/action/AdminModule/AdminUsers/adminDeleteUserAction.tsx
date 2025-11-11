// actions.js

import { 
    USER_DELETE_CLEAR, 
    USER_DELETE_FAILURE, 
    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminUsers/adminDeleteUserActionType";


export const fetchUserDeleteRequest = (payload: any) => ({
    type: USER_DELETE_REQUEST,
    payload: payload,
});

export const fetchUserDeleteSuccess = (data: string) => ({
    type: USER_DELETE_SUCCESS,
    payload: data,
});

export const fetchUserDeleteFailure = (error: any) => ({
    type: USER_DELETE_FAILURE,
    payload: error,
});
export const fetchUserDeleteClear = (data: any) => ({
    type: USER_DELETE_CLEAR,
    payload: data,
});
