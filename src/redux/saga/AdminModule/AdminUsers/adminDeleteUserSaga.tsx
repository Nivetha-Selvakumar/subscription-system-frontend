import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
    fetchUserDeleteSuccess,
    fetchUserDeleteFailure,
} from "../../../action/AdminModule/AdminUsers/adminDeleteUserAction";
import { USER_DELETE_REQUEST } from "../../../actionTypes/AdminModule/AdminUsers/adminDeleteUserActionType";

// Prevent duplicate API hits
let isPrevent = false;

function* userDeleteSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;
    try {
        isPrevent = true;

        const { userId, targetUserId } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build correct URL with query parameter
        const url = `${AUTH.USER_DELETE}?targetUserId=${targetUserId}`;

        // ✅ DELETE method with headers (no body)
        const response = yield call(axios.delete, url, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                userId, // ✅ header for admin
            },
        });

        const data = response.data;
        yield put(fetchUserDeleteSuccess(data));
        showToast("User deleted successfully", "success", "User-List");
    } catch (error: any) {
        yield put(fetchUserDeleteFailure(error.message));

        const errorMessage = error?.response?.data?.Error;
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "User-List");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "User-List");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "User-List"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchUserDelete() {
    yield takeLatest(USER_DELETE_REQUEST, userDeleteSaga);
}
