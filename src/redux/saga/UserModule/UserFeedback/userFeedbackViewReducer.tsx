import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import {
    fechUserFeedbackViewFailure,
    fechUserFeedbackViewSuccess,
} from "../../../action/UserModule/UserFeedback/userFeedbackViewAction";
import { USER_FEEDBACK_VIEW_REQUEST } from "../../../actionTypes/UserModule/UserFeedback/userFeedbackViewActionTypes";

let isPrevent = false;

function* userFeedbackListSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { targetFeedbackId } = action.payload;
        const tokenVal = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        // ✅ Construct URL with query param
        const url = `${AUTH.FEEDBACK_VIEW}?targetFeedbackId=${targetFeedbackId}`;

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
        yield put(fechUserFeedbackViewSuccess(data));

    } catch (error: any) {
        yield put(fechUserFeedbackViewFailure(error.message));
    } finally {
        isPrevent = false;
    }
}

// ✅ Watcher Saga
export function* watchPlanView() {
    yield takeLatest(USER_FEEDBACK_VIEW_REQUEST, userFeedbackListSaga);
}
