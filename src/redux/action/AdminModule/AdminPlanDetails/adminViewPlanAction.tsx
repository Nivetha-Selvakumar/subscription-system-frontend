// actions.js

import { 
    PLAN_VIEW_CLEAR, 
    PLAN_VIEW_FAILURE, 
    PLAN_VIEW_REQUEST, 
    PLAN_VIEW_SUCCESS 

} from "../../../actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes";


export const fetchPlanViewRequest = (payload: any) => ({
    type: PLAN_VIEW_REQUEST,
    payload: payload,
});

export const fetchPlanViewSuccess = (data: string) => ({
    type: PLAN_VIEW_SUCCESS,
    payload: data,
});

export const fetchPlanViewFailure = (error: any) => ({
    type: PLAN_VIEW_FAILURE,
    payload: error,
});
export const fetchPlanViewClear = (data: any) => ({
    type: PLAN_VIEW_CLEAR,
    payload: data,
});
