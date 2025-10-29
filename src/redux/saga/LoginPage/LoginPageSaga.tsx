// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "../../action/LoginPage/LoginAction";
import { FETCH_DATA_REQUEST } from "../../actionTypes/LoginPage/LoginActionTypes";
import { AUTH } from "../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../common-components/ui/toastNotification";


function* fetchDataSaga(action: any): Generator<any, void, any> {

    try {
        const payload = action.payload;
        const response = yield call(axios.post, AUTH.LOGIN, payload);
        const data = yield response;
        // Authuentiocation porpuse
        localStorage.setItem('token', data.data.data.token)

        yield put(fetchDataSuccess(response?.data?.data));
        showToast('Login Successful', "success", "Login");
    } catch (error: any) {
        const message = error?.response?.data?.message;
        if (Array.isArray(message) && message.length > 0) {
        }
        // Dispatch failure action with error message
        yield put(fetchDataFailure(error?.response?.data?.message));
        showToast(error?.response?.data?.message, "error", "Login");
    }
}

export function* watchFetchData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

