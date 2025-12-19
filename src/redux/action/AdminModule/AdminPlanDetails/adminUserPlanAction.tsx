// actions.js

import { PLAN_LIST_CLEAR, PLAN_LIST_FAILURE, PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS } from "../../../actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes";


export const fetchPlanListRequest = (payload: any) => ({
    type: PLAN_LIST_REQUEST,
    payload: payload,
});

export const fetchPlanListSuccess = (data: string) => ({
    type: PLAN_LIST_SUCCESS,
    payload: data,
});

export const fetchPlanListFailure = (error: any) => ({
    type: PLAN_LIST_FAILURE,
    payload: error,
});
export const fetchPlanListClear = (data: any) => ({
    type: PLAN_LIST_CLEAR,
    payload: data,
});
