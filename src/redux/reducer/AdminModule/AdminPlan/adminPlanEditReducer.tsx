import { PLAN_EDIT_REQUEST, PLAN_EDIT_SUCCESS, PLAN_EDIT_FAILURE, PLAN_EDIT_CLEAR } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanEditActionTypes';

const initialState = {
    planEdit: null,
    planEditLoading: false,
    error: null,
};

const planEditReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PLAN_EDIT_REQUEST:
            return {
                ...state,
                planEdit: null,
                planEditLoading: true,
                error: null,
            };
        case PLAN_EDIT_SUCCESS:
            return {
                ...state,
                planEdit: action.payload,
                planEditLoading: false,
                error: null,
            };
        case PLAN_EDIT_FAILURE:
            return {
                ...state,
                planEdit: null,
                planEditLoading: false,
                error: action.payload,
            };
        case PLAN_EDIT_CLEAR:
            return {
                planEdit: null,
                planEditLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default planEditReducer;
