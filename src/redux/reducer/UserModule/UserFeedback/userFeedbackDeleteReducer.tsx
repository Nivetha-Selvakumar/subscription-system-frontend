// reducers.js
import {
   USER_FEEDBACK_DELETE_CLEAR,
   USER_FEEDBACK_DELETE_FAILURE,
   USER_FEEDBACK_DELETE_REQUEST,
   USER_FEEDBACK_DELETE_SUCCESS,  
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackDeleteActionTypes';


const initialState = {
    userFeedbackDelete: null,
    userFeedbackDeleteLoading: false,
    error: null,
};

const userFeedbackDeleteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_FEEDBACK_DELETE_REQUEST:
            return {
                ...state,
                userFeedbackDelete: null,
                userFeedbackDeleteLoading: true,
                error: null,
            };
        case USER_FEEDBACK_DELETE_SUCCESS:
            return {
                ...state,
                userFeedbackDelete: action.payload,
                userFeedbackDeleteLoading: false,
                error: null,
            };
        case USER_FEEDBACK_DELETE_FAILURE:
            return {
                ...state,
                userFeedbackDelete: null,
                userFeedbackDeleteLoading: false,
                error: action.payload,
            };

        case USER_FEEDBACK_DELETE_CLEAR:
            return {
                userFeedbackDelete: null,
                userFeedbackDeleteLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userFeedbackDeleteReducer;
