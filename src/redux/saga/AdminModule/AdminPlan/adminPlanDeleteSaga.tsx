import { call, put, takeLatest } from "redux-saga/effects";
import { PLAN_DELETE_REQUEST } from "../../../actionTypes/AdminModule/AdminPlan/adminPlanDeleteActionTypes";
import { AUTH } from "../../../endpoints/endpoints";
import {
    fetchPlanDeleteFailure,
    fetchPlanDeleteSuccess,
} from "../../../action/AdminModule/AdminPlanDetails/adminDeletePlanAction";
import showToast from "../../../../common-components/ui/toastNotification";
import axios from "axios";

let isPrevent = false;

function* planDeleteSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { userId, targetPlanId } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build URL with query parameter
        const url = `${AUTH.PLAN_DELETE}?targetPlanId=${targetPlanId}`;

        // ✅ DELETE request with headers
        const response = yield call(axios.delete, url, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                userId,
            },
        });

        // ✅ Dispatch success
        yield put(fetchPlanDeleteSuccess(response.data));
        showToast("Plan deleted successfully", "success", "Plan-List");
    } catch (error: any) {
        // ✅ Handle failure
        yield put(fetchPlanDeleteFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Plan-List");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Plan-List");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Plan-List"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchPlanDelete() {
    yield takeLatest(PLAN_DELETE_REQUEST, planDeleteSaga);
}
