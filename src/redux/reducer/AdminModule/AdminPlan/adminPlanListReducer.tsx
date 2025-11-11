import { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAILURE, PLAN_LIST_CLEAR } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes';

const initialState = {
    planList: null,
    planListLoading: false,
    error: null,
};

const planListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAN_LIST_REQUEST:
            return {
                ...state,
                planList: null,
                planListLoading: true,
                error: null,
            };
        case PLAN_LIST_SUCCESS:
            return {
                ...state,
                planList: action.payload,
                planListLoading: false,
                error: null,
            };
        case PLAN_LIST_FAILURE:
            return {
                ...state,
                planList: null,
                planListLoading: false,
                error: action.payload,
            };
        case PLAN_LIST_CLEAR:
            return {
                planList: null,
                planListLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default planListReducer;
