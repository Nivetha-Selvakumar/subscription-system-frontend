import { LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "../../actionTypes/Logout/LogoutActionTypes";

export const logoutRequest = (payload: any) => ({
    type: LOGOUT_USER_REQUEST,
    payload: payload
})

export const logoutSuccess = (data: any) => ({
    type: LOGOUT_USER_SUCCESS,
    payload: data,
});

export const logoutfailure = (error: any) => (
    {
        type: LOGOUT_USER_FAILURE,
        Payload: error
    }
)