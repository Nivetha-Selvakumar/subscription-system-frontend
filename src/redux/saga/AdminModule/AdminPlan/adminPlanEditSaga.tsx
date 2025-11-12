import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
    fetchPlanEditFailure,
    fetchPlanEditSuccess,
} from "../../../action/AdminModule/AdminPlanDetails/adminEditPlanAction";
import { PLAN_EDIT_REQUEST } from "../../../actionTypes/AdminModule/AdminPlan/adminPlanEditActionTypes";

let isPrevent = false;

function* planEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { adminUserId, targetPlanId, payload } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build correct URL with query parameter
        const url = `${AUTH.PLAN_EDIT}?targetPlanId=${targetPlanId}`;

        // ✅ Axios PUT request with headers
        const response = yield call(axios.put, url, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": adminUserId, // matches backend header
            },
        });

        const data = response.data;

        // ✅ Dispatch success
        yield put(fetchPlanEditSuccess(data));
        showToast("Plan updated successfully", "success", "Plan-Edit");
    } catch (error: any) {
        // ✅ Dispatch failure
        yield put(fetchPlanEditFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Plan-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Plan-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Plan-Edit"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchPlanEdit() {
    yield takeLatest(PLAN_EDIT_REQUEST, planEditSaga);
}
