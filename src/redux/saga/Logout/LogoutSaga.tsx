
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../endpoints/endpoints";
import showToast from "../../../common-components/ui/toastNotification";
import { logoutfailure, logoutSuccess } from "../../action/Logout/LogoutAction";
import { LOGOUT_USER_REQUEST } from "../../actionTypes/Logout/LogoutActionTypes";
import { deleteCookie } from "../../../utils/constants/Functional/funtional";

function* logoutsaga(action: any): Generator<any, void, any> {
    try {
        const tokenVal = localStorage.getItem('authToken');

        const token = 'Bearer ' + tokenVal;

        // Set up the request headers with the bearer token
        const config = {
            headers: {
                Authorization: token,
            },
        };

        const response = yield call(axios.post, AUTH.LOGOUT, null, config);
        const data = response.data;
        // Show toast message
        showToast('Logged Out Successful', 'success', "Logout");
        yield put(logoutSuccess(data));
        localStorage.removeItem('authToken')
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('userName');
        deleteCookie('token');

        setTimeout(() => {
            showToast("Logout successful!", "success", "NavBar-Component");
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }, 900);
    } catch (error: any) {
        showToast(error.response?.data?.message, 'error', "Logout");
        yield put(logoutfailure(error));
    }
}

export function* watchLogoutSaga() {
    yield takeLatest(LOGOUT_USER_REQUEST, logoutsaga);
}
