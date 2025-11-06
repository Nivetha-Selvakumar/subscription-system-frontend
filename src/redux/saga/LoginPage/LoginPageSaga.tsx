// src/redux/sagas/LoginPage/loginSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_DATA_REQUEST } from "../../actionTypes/LoginPage/LoginActionTypes";
import { fetchLoginDataSuccess, fetchLoginDataFailure } from "../../action/LoginPage/LoginAction";
import { AUTH } from "../../endpoints/endpoints";
import showToast from "../../../common-components/ui/toastNotification";
import { setCookie } from "../../../utils/constants/Functional/funtional";

// ✅ Helper function to set header globally
function setAuthHeader(token: string) {
    if (token) {
        axios.defaults.headers.common["Auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["Auth-token"];
    }
}

let isPrevent = false;

function* fetchLoginUserSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;
        const payload = action.payload;

        // 🔹 API call
        const response = yield call(axios.post, AUTH.LOGIN, payload);
        const data = response?.data;

        // ✅ Token handling
        if (data?.loginData?.authToken) {
            localStorage.setItem("authToken", data?.loginData?.authToken);
            setCookie("authToken", data?.loginData?.authToken);
            setAuthHeader(data?.loginData?.authToken);
        }

        // ✅ Dispatch success
        yield put(fetchLoginDataSuccess(data));

    } catch (error: any) {
        const message = error?.response?.data?.Error || "Something went wrong!";
        yield put(fetchLoginDataFailure(message));
        showToast(message, "error", "Login-Container");
    } finally {
        isPrevent = false;
    }
}

export function* watchFetchLoginData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchLoginUserSaga);
}
