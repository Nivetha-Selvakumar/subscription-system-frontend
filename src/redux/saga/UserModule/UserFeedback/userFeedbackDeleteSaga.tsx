import { call, put, takeLatest } from "redux-saga/effects";
import { USER_FEEDBACK_DELETE_REQUEST } from "../../../actionTypes/UserModule/UserFeedback/userFeedbackDeleteActionTypes";
import { AUTH } from "../../../endpoints/endpoints";
import {
    fetchUserFeedbackDeleteFailure,
    fetchUserFeedbackDeleteSuccess,
} from "../../../action/UserModule/UserFeedback/userFeedbackDeleteAction";
import showToast from "../../../../common-components/ui/toastNotification";
import axios from "axios";

let isPrevent = false;

function* userFeedbackDeleteSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { userId, targetFeedbackId } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build URL with query parameter
        const url = `${AUTH.FEEDBACK_DELETE}?targetFeedbackId=${targetFeedbackId}`;

        // ✅ DELETE request with headers
        const response = yield call(axios.delete, url, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                userId,
            },
        });

        // ✅ Dispatch success
        yield put(fetchUserFeedbackDeleteFailure(response.data));
        showToast("Feedback deleted successfully", "success", "Feedback-List");
    } catch (error: any) {
        // ✅ Handle failure
        yield put(fetchUserFeedbackDeleteSuccess(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Feedback-List");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Feedback-List");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Feedback-List"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchuserFeedbackDelete() {
    yield takeLatest(USER_FEEDBACK_DELETE_REQUEST, userFeedbackDeleteSaga);
}
