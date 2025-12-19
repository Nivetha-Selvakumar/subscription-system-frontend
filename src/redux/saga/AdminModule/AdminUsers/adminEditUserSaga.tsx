import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
    fetchUserEditFailure,
    fetchUserEditSuccess,
} from "../../../action/AdminModule/AdminUsers/adminEditUserAction";
import { USER_EDIT_REQUEST } from "../../../actionTypes/AdminModule/AdminUsers/adminEditUserActionType";

let isPrevent = false;

function* userEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { userId, targetUserId, payload } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build correct URL with query param
        const url = `${AUTH.USER_EDIT}?targetUserId=${targetUserId}`;

        // ✅ Proper axios PUT signature (url, data, config)
        const response = yield call(axios.put, url, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": userId, // ✅ exact match for backend header
            },
        });

        const data = response.data;

        yield put(fetchUserEditSuccess(data));
        // showToast("User edited successfully", "success", "User-Edit");
    } catch (error: any) {
        yield put(fetchUserEditFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "User-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "User-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "User-Edit"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchUserEdit() {
    yield takeLatest(USER_EDIT_REQUEST, userEditSaga);
}
