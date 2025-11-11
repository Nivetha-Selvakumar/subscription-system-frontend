// sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import {
    fetchUserViewFailure,
    fetchUserViewSuccess,
} from "../../../action/AdminModule/AdminUsers/adminViewUserAction";
import { USER_VIEW_REQUEST } from "../../../actionTypes/AdminModule/AdminUsers/adminViewUserActionType";

// Prevent duplicate API hits
let isPrevent = false;

function* userViewSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { userId } = action.payload;
        const tokenVal = localStorage.getItem("token");
        const requestorId =localStorage.getItem("user_id");

        // ✅ Construct the URL with query param
        const url = `${AUTH.USER_VIEW}?targetUserId=${userId}`;

        const response = yield call(axios.get, url, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": requestorId, // ✅ Header param
            },
        });

        // ✅ Extract data
        const data = yield response.data;

        yield put(fetchUserViewSuccess(data));
        // showToast("User created successfully", "success", "User-Create");
    } catch (error: any) {
        yield put(fetchUserViewFailure(error.message));
    } finally {
        isPrevent = false;
    }
}

export function* watchUserView() {
    yield takeLatest(USER_VIEW_REQUEST, userViewSaga);
}
