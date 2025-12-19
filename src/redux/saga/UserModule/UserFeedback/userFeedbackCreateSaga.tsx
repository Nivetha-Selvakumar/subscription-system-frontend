import { call, put, takeLatest } from 'redux-saga/effects';
import { USER_FEEDBACK_CREATE_REQUEST } from '../../../actionTypes/UserModule/UserFeedback/userFeedbackCreateActionTypes';
import { AUTH } from '../../../endpoints/endpoints';
import axios from 'axios';
import { fetchUserFeedbackCreateSuccess, fetchUserFeedbackCreateFailure } from '../../../action/UserModule/UserFeedback/userFeedbackCreateAction';
import showToast from '../../../../common-components/ui/toastNotification';


// Prevent duplicate API hits
let isPrevent = false;
function* userFeedbackCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id"); // assuming admin is logged in

        const url = `${AUTH.FEEDBACK_CREATE}`;

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

        yield put(fetchUserFeedbackCreateSuccess(data));
        // showToast("Plan created successfully", "success", "Feedback-Create");
    } catch (error: any) {

        yield put(fetchUserFeedbackCreateFailure(error.message));
        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Feedback-Create");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Feedback-Create");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Feedback-Create"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchUserFeedbackCreate() {
    yield takeLatest(USER_FEEDBACK_CREATE_REQUEST, userFeedbackCreateSaga);
}
