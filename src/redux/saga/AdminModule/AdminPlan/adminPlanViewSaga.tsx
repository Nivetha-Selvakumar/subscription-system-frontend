import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import {
    fetchPlanViewFailure,
    fetchPlanViewSuccess,
} from "../../../action/AdminModule/AdminPlanDetails/adminViewPlanAction";
import { PLAN_VIEW_REQUEST } from "../../../actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes";

let isPrevent = false;

function* planViewSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { planId } = action.payload;
        const tokenVal = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        // ✅ Construct URL with query param
        const url = `${AUTH.PLAN_VIEW}?targetPlanId=${planId}`;

        // ✅ API call with headers
        const response = yield call(axios.get, url, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": userId,
            },
        });

        // ✅ Extract and dispatch data
        const data = response.data;
        yield put(fetchPlanViewSuccess(data));

        // Optionally, show toast
        // showToast("Plan details loaded successfully", "success", "Plan-View");
    } catch (error: any) {
        yield put(fetchPlanViewFailure(error.message));
    } finally {
        isPrevent = false;
    }
}

// ✅ Watcher Saga
export function* watchPlanView() {
    yield takeLatest(PLAN_VIEW_REQUEST, planViewSaga);
}
