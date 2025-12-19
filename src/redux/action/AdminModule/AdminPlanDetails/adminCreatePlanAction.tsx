// actions.js

import {
    PLAN_CREATE_CLEAR,
    PLAN_CREATE_FAILURE,
    PLAN_CREATE_REQUEST,
    PLAN_CREATE_SUCCESS,  
} from '../../../actionTypes/AdminModule/AdminPlan/adminPlanCreateActionTypes';

export const fetchPlanCreateRequest = (payload: any) => ({
    type: PLAN_CREATE_REQUEST,
    payload: payload,
});

export const fetchPlanCreateSuccess = (data: string) => ({
    type: PLAN_CREATE_SUCCESS,
    payload: data,
});

export const fetchPlanCreateFailure = (error: any) => ({
    type: PLAN_CREATE_FAILURE,
    payload: error,
});

export const fetchPlanCreateClear = (data: any) => ({
    type: PLAN_CREATE_CLEAR,
    payload: data,
});