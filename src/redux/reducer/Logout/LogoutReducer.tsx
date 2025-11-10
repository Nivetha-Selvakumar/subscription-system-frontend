import { LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "../../actionTypes/Logout/LogoutActionTypes";


const initialState = {
    logoutdata: null,
    logoutloading: false,
    error: null,

}

const logoutReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT_USER_REQUEST:
            return {
                logoutdata: action.payload,
                logoutloading: true,
                error: null,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: null,
            };
        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                logoutdata: null,
                logoutloading: true,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default logoutReducer;