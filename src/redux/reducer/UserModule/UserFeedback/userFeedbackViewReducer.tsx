// reducers.js
import {
   USER_FEEDBACK_VIEW_CLEAR,
   USER_FEEDBACK_VIEW_FAILURE,
   USER_FEEDBACK_VIEW_REQUEST,
   USER_FEEDBACK_VIEW_SUCCESS,  
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackViewActionTypes';


const initialState = {
    userFeedbackView: null,
    userFeedbackViewLoading: false,
    error: null,
};

const userFeedbackViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_FEEDBACK_VIEW_REQUEST:
            return {
                ...state,
                userFeedbackView: null,
                userFeedbackViewLoading: true,
                error: null,
            };
        case USER_FEEDBACK_VIEW_SUCCESS:
            return {
                ...state,
                userFeedbackView: action.payload,
                userFeedbackViewLoading: false,
                error: null,
            };
        case USER_FEEDBACK_VIEW_FAILURE:
            return {
                ...state,
                userFeedbackView: null,
                userFeedbackViewLoading: false,
                error: action.payload,
            };

        case USER_FEEDBACK_VIEW_CLEAR:
            return {
                userFeedbackView: null,
                userFeedbackViewLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userFeedbackViewReducer;
