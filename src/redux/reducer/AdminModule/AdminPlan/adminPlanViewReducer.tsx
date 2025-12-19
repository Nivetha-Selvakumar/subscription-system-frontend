import { PLAN_VIEW_REQUEST, PLAN_VIEW_SUCCESS, PLAN_VIEW_FAILURE, PLAN_VIEW_CLEAR } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes';

const initialState = {
    planView: null,
    planViewLoading: false,
    error: null,
};

const planViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAN_VIEW_REQUEST:
            return {
                ...state,
                planView: null,
                planViewLoading: true,
                error: null,
            };
        case PLAN_VIEW_SUCCESS:
            return {
                ...state,
                planView: action.payload,
                planViewLoading: false,
                error: null,
            };
        case PLAN_VIEW_FAILURE:
            return {
                ...state,
                planView: null,
                planViewLoading: false,
                error: action.payload,
            };
        case PLAN_VIEW_CLEAR:
            return {
                planView: null,
                planViewLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default planViewReducer;
