// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../common-components/ui/toastNotification";
import { userCreateFailure, userCreateSuccess } from "../../action/SignUpPage/SignUpAction";
import { USER_CREATE_REQUEST } from "../../actionTypes/SignUpPage/SignupActionTypes";
import { setCookie } from "../../../utils/constants/Functional/funtional";

function setAuthHeader(token: string) {
    if (token) {
        axios.defaults.headers.common["Auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["Auth-token"];
    }
}

let isPrevent = false;
function* userCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) {
        return
    }


    try {
        isPrevent = true
        const payload = action.payload;

        const response = yield call(axios.post, AUTH.SIGNUP, payload);
        const data = yield response;

        // ✅ Token handling
        if (data?.data?.userData?.authToken) {
            localStorage.setItem("authToken", data?.data?.userData?.authToken);
            setCookie("authToken", data?.data?.userData?.authToken);
            setAuthHeader(data?.data?.userData?.authToken);
        }

        yield put(userCreateSuccess(data?.data));
    } catch (error: any) {
        yield put(userCreateFailure(error.message));
        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            // Handle as array
            showToast(errorMessage[0], "error", "User-Create");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            // Handle as object
            showToast(JSON.stringify(errorMessage), "error", "User-Create");
        } else {
            // Handle as a string or fallback case
            showToast(errorMessage || "An error occurred", "error", "User-Create");
        }


    } finally {
        isPrevent = false
    }
}

export function* watchUserCreate() {
    yield takeLatest(USER_CREATE_REQUEST, userCreateSaga);
}