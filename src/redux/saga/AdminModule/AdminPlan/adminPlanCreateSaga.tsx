import { call, put, takeLatest } from 'redux-saga/effects';
import { PLAN_CREATE_REQUEST } from '../../../actionTypes/AdminModule/AdminPlan/adminPlanCreateActionTypes';
import { AUTH } from '../../../endpoints/endpoints';
import axios from 'axios';
import { fetchPlanCreateFailure, fetchPlanCreateSuccess } from '../../../action/AdminModule/AdminPlanDetails/adminCreatePlanAction';
import showToast from '../../../../common-components/ui/toastNotification';


// Prevent duplicate API hits
let isPrevent = false;
function* planCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id"); // assuming admin is logged in

        const url = `${AUTH.PLAN_CREATE}`;

        // ✅ Correct axios signature: axios.post(url, data, config)
        const response = yield call(axios.post, url, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": user_id,
            },
        });

        // ✅ Extract data
        const data = yield response.data;

        yield put(fetchPlanCreateSuccess(data));
        // showToast("Plan created successfully", "success", "Plan-Create");
    } catch (error: any) {

        yield put(fetchPlanCreateFailure(error.message));
        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Plan-Create");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Plan-Create");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Plan-Create"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchPlanCreate() {
    yield takeLatest(PLAN_CREATE_REQUEST, planCreateSaga);
}
