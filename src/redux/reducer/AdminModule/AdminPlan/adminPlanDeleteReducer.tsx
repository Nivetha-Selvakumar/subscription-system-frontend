import { PLAN_DELETE_REQUEST, PLAN_DELETE_SUCCESS, PLAN_DELETE_FAILURE, PLAN_DELETE_CLEAR } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanDeleteActionTypes';

const initialState = {
    planDelete: null,
    planDeleteLoading: false,
    error: null,
};

const planDeleteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAN_DELETE_REQUEST:
            return {
                ...state,
                planDelete: null,
                planDeleteLoading: true,
                error: null,
            };
        case PLAN_DELETE_SUCCESS:
            return {
                ...state,
                planDelete: action.payload,
                planDeleteLoading: false,
                error: null,
            };
        case PLAN_DELETE_FAILURE:
            return {
                ...state,
                planDelete: null,
                planDeleteLoading: false,
                error: action.payload,
            };
        case PLAN_DELETE_CLEAR:
            return {
                planDelete: null,
                planDeleteLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default planDeleteReducer;
