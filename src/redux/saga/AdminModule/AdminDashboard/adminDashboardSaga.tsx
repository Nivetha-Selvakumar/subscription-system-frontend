import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchAdminDashboardListFailure,
    fetchAdminDashboardListSuccess,
} from "../../../action/AdminModule/AdminDashboard/adminDashboardAction";
import { ADMIN_DASHBOARD_LIST_REQUEST } from "../../../actionTypes/AdminModule/AdminDashboard/adminDashboardActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* adminDashboardListSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ✅ Axios GET with params & headers
        const response = yield call(axios.get, AUTH.ADMIN_DASHBOARD, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "User-id": user_id,
            },
        });

        // ✅ Dispatch success action
        yield put(fetchAdminDashboardListSuccess(response?.data));
    } catch (error: any) {
        // ❌ Handle API or network errors
        yield put(fetchAdminDashboardListFailure(error.message));

        const errorMessage = error?.response?.data?.Error;
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Admin-Dashboard");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Admin-Dashboard");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Admin-Dashboard"
            );
        }
    } finally {
        isPrevent = false;
    }
}

// ✅ Watcher
export function* watchAdminDashboardList() {
    yield takeLeading(ADMIN_DASHBOARD_LIST_REQUEST, adminDashboardListSaga);
}
