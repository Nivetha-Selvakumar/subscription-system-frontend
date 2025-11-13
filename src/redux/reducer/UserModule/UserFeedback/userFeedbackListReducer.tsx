// reducers.js
import {
   USER_FEEDBACK_LIST_CLEAR,
   USER_FEEDBACK_LIST_FAILURE,
   USER_FEEDBACK_LIST_REQUEST,
   USER_FEEDBACK_LIST_SUCCESS,  
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes';


const initialState = {
    userFeedbackList: null,
    userFeedbackListLoading: false,
    error: null,
};

const userFeedbackListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_FEEDBACK_LIST_REQUEST:
            return {
                ...state,
                userFeedbackList: null,
                userFeedbackListLoading: true,
                error: null,
            };
        case USER_FEEDBACK_LIST_SUCCESS:
            return {
                ...state,
                userFeedbackList: action.payload,
                userFeedbackListLoading: false,
                error: null,
            };
        case USER_FEEDBACK_LIST_FAILURE:
            return {
                ...state,
                userFeedbackList: null,
                userFeedbackListLoading: false,
                error: action.payload,
            };

        case USER_FEEDBACK_LIST_CLEAR:
            return {
                userFeedbackList: null,
                userFeedbackListLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userFeedbackListReducer;
