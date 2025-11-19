import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUserDashboardListFailure,
    fetchUserDashboardListSuccess,
} from "../../../action/UserModule/UserDashboard/userDashboardAction";
import { USER_DASHBOARD_LIST_REQUEST } from "../../../actionTypes/UserModule/UserDashboard/userDashboardActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* userDashboardListSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ✅ Axios GET with params & headers
        const response = yield call(axios.get, AUTH.USER_DASHBOARD, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "User-id": user_id,
            },
        });

        // ✅ Dispatch success action
        yield put(fetchUserDashboardListSuccess(response?.data?.data));
    } catch (error: any) {
        // ❌ Handle API or network errors
        yield put(fetchUserDashboardListFailure(error.message));

        const errorMessage = error?.response?.data?.Error;
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "User-Dashboard");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "User-Dashboard");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "User-Dashboard"
            );
        }
    } finally {
        isPrevent = false;
    }
}

// ✅ Watcher
export function* watchUserDashboardList() {
    yield takeLeading(USER_DASHBOARD_LIST_REQUEST, userDashboardListSaga);
}
