// actions.js

import { 
    PLAN_DELETE_CLEAR, 
    PLAN_DELETE_FAILURE, 
    PLAN_DELETE_REQUEST, 
    PLAN_DELETE_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminPlan/adminPlanDeleteActionTypes";


export const fetchPlanDeleteRequest = (payload: any) => ({
    type: PLAN_DELETE_REQUEST,
    payload: payload,
});

export const fetchPlanDeleteSuccess = (data: string) => ({
    type: PLAN_DELETE_SUCCESS,
    payload: data,
});

export const fetchPlanDeleteFailure = (error: any) => ({
    type: PLAN_DELETE_FAILURE,
    payload: error,
});
export const fetchPlanDeleteClear = (data: any) => ({
    type: PLAN_DELETE_CLEAR,
    payload: data,
});
