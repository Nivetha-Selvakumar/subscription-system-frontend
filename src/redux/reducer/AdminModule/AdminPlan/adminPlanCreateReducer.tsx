import { PLAN_CREATE_REQUEST, PLAN_CREATE_SUCCESS, PLAN_CREATE_FAILURE, PLAN_CREATE_CLEAR } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanCreateActionTypes';

const initialState = {
    planCreate: null,
    planCreateLoading: false,
    error: null,
};

const planCreateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAN_CREATE_REQUEST:
            return {
                ...state,
                planCreate: null,
                planCreateLoading: true,
                error: null,
            };
        case PLAN_CREATE_SUCCESS:
            return {
                ...state,
                planCreate: action.payload,
                planCreateLoading: false,
                error: null,
            };
        case PLAN_CREATE_FAILURE:
            return {
                ...state,
                planCreate: null,
                planCreateLoading: false,
                error: action.payload,
            };
        case PLAN_CREATE_CLEAR:
            return {
                planCreate: null,
                planCreateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default planCreateReducer;
