import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
    fechUserFeedbackEditFailure,
    fechUserFeedbackEditSuccess,
} from "../../../action/UserModule/UserFeedback/userFeedbackEditAction";
import { USER_FEEDBACK_EDIT_REQUEST } from "../../../actionTypes/UserModule/UserFeedback/userFeedbackEditActionTypes";

let isPrevent = false;

function*  userFeedbackEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { adminUserId, targetFeedbackId, payload } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build correct URL with query parameter
        const url = `${AUTH.FEEDBACK_EDIT}?targetFeedbackId=${targetFeedbackId}`;

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
        yield put(fechUserFeedbackEditSuccess(data));
        showToast("Feedback updated successfully", "success", "Feedback-Edit");
    } catch (error: any) {
        // ✅ Dispatch failure
        yield put(fechUserFeedbackEditFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Feedback-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Feedback-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Feedback-Edit"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchuserFeedbackEdit() {
    yield takeLatest(USER_FEEDBACK_EDIT_REQUEST,  userFeedbackEditSaga);
}
