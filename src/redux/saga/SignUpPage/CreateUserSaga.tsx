// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../common-components/ui/toastNotification";
import { userCreateFailure, userCreateSuccess } from "../../action/SignUpPage/SignUpAction";
import { USER_CREATE_REQUEST } from "../../actionTypes/SignUpPage/SignupActionTypes";

let isPrevent = false;
function* userCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) {
        return
    }


    try {
        isPrevent = true
        // const tokenVal = localStorage.getItem('token');

        // const token = 'Bearer ' + tokenVal;

        // // Set up the request headers with the bearer token
        // const config = {
        //     headers: {
        //         Authorization: token,
        //     },
        // };

        const payload = action.payload;

        const response = yield call(axios.post, AUTH.SIGNUP, payload);
        const data = yield response;
        yield put(userCreateSuccess(data.data));
    } catch (error: any) {
        yield put(userCreateFailure(error.message));
        const errorMessage = error?.response?.data?.message;

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