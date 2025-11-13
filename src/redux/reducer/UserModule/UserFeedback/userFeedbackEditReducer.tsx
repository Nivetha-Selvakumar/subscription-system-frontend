// reducers.js
import {
   USER_FEEDBACK_EDIT_CLEAR,
   USER_FEEDBACK_EDIT_FAILURE,
   USER_FEEDBACK_EDIT_REQUEST,
   USER_FEEDBACK_EDIT_SUCCESS,  
} from '../../../actionTypes/UserModule/UserFeedback/userFeedbackEditActionTypes';


const initialState = {
    userFeedbackEdit: null,
    userFeedbackEditLoading: false,
    error: null,
};

const userFeedbackEditReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_FEEDBACK_EDIT_REQUEST:
            return {
                ...state,
                userFeedbackEdit: null,
                userFeedbackEditLoading: true,
                error: null,
            };
        case USER_FEEDBACK_EDIT_SUCCESS:
            return {
                ...state,
                userFeedbackEdit: action.payload,
                userFeedbackEditLoading: false,
                error: null,
            };
        case USER_FEEDBACK_EDIT_FAILURE:
            return {
                ...state,
                userFeedbackEdit: null,
                userFeedbackEditLoading: false,
                error: action.payload,
            };

        case USER_FEEDBACK_EDIT_CLEAR:
            return {
                userFeedbackEdit: null,
                userFeedbackEditLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userFeedbackEditReducer;
