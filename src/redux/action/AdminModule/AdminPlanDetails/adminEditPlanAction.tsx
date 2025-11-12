// actions.js

import { 
    PLAN_EDIT_CLEAR, 
    PLAN_EDIT_FAILURE, 
    PLAN_EDIT_REQUEST, 
    PLAN_EDIT_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminPlan/adminPlanEditActionTypes";


export const fetchPlanEditRequest = (payload: any) => ({
    type: PLAN_EDIT_REQUEST,
    payload: payload,
});

export const fetchPlanEditSuccess = (data: string) => ({
    type: PLAN_EDIT_SUCCESS,
    payload: data,
});

export const fetchPlanEditFailure = (error: any) => ({
    type: PLAN_EDIT_FAILURE,
    payload: error,
});
export const fetchPlanEditClear = (data: any) => ({
    type: PLAN_EDIT_CLEAR,
    payload: data,
});
