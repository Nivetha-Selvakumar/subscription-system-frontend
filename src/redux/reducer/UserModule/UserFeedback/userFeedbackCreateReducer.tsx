// reducers.js
import {
   USER_FEEDBACK_CREATE_CLEAR,
   USER_FEEDBACK_CREATE_FAILURE,
   USER_FEEDBACK_CREATE_REQUEST,
   USER_FEEDBACK_CREATE_SUCCESS,  
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackCreateActionTypes';


const initialState = {
    userFeedbackCreate: null,
    userFeedbackCreateLoading: false,
    error: null,
};

const userFeedbackCreateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_FEEDBACK_CREATE_REQUEST:
            return {
                ...state,
                userFeedbackCreate: null,
                userFeedbackCreateLoading: true,
                error: null,
            };
        case USER_FEEDBACK_CREATE_SUCCESS:
            return {
                ...state,
                userFeedbackCreate: action.payload,
                userFeedbackCreateLoading: false,
                error: null,
            };
        case USER_FEEDBACK_CREATE_FAILURE:
            return {
                ...state,
                userFeedbackCreate: null,
                userFeedbackCreateLoading: false,
                error: action.payload,
            };

        case USER_FEEDBACK_CREATE_CLEAR:
            return {
                userFeedbackCreate: null,
                userFeedbackCreateLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userFeedbackCreateReducer;
