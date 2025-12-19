// actions.js

import { 
    USER_EDIT_CLEAR, 
    USER_EDIT_FAILURE, 
    USER_EDIT_REQUEST, 
    USER_EDIT_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminUsers/adminEditUserActionType";


export const fetchUserEditRequest = (payload: any) => ({
    type: USER_EDIT_REQUEST,
    payload: payload,
});

export const fetchUserEditSuccess = (data: string) => ({
    type: USER_EDIT_SUCCESS,
    payload: data,
});

export const fetchUserEditFailure = (error: any) => ({
    type: USER_EDIT_FAILURE,
    payload: error,
});
export const fetchUserEditClear = (data: any) => ({
    type: USER_EDIT_CLEAR,
    payload: data,
});
