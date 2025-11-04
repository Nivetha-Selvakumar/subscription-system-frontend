// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { fetchLoginDataSuccess, fetchLoginDataFailure } from "../../action/LoginPage/LoginAction";
import { FETCH_DATA_REQUEST } from "../../actionTypes/LoginPage/LoginActionTypes";
import { AUTH } from "../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../common-components/ui/toastNotification";

let isPrevent = false;
function* fetchLoginUserSaga(action: any): Generator<any, void, any> {
    if (isPrevent) {
        return
    }

    try {
        isPrevent = true
        const payload = action.payload;

        const response = yield call(axios.post, AUTH.LOGIN, payload);
        yield put(fetchLoginDataSuccess(response?.data));
    } catch (error: any) {
        const message = error?.response?.data?.Error;
        if (Array.isArray(message) && message.length > 0) {
        }
        // Dispatch failure action with error message
        yield put(fetchLoginDataFailure(error?.response?.data?.message));
        showToast(message, "error", "Login-Container");
    }finally {
        isPrevent = false
    }
}

export function* watchFetchLoginData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchLoginUserSaga);
}

