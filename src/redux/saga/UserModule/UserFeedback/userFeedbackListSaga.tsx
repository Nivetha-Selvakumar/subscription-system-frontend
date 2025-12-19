import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUserFeedbackListFailure,
    fetchUserFeedbackListSuccess,
} from "../../../action/UserModule/UserFeedback/userFeedbackListAction";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";
import { USER_FEEDBACK_LIST_REQUEST } from "../../../actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes";

let isPrevent = false;

function* userFeedbackListSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ✅ Axios GET with params & headers
        const response = yield call(axios.get, AUTH.FEEDBACK_LIST, {
            params: {
                search: payload?.search || "",
                filterBy: payload?.filterBy || "",
                sortBy: payload?.sortBy || "createdAt",
                sortDir: payload?.sortDir || "asc",
                offset: payload?.offset || 0,
                limit: payload?.limit || 10,
            },
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "User-id": user_id,
            },
        });


        // ✅ Dispatch success action
        yield put(fetchUserFeedbackListSuccess(response?.data));
    } catch (error: any) {
        // ❌ Handle API or network errors
        yield put(fetchUserFeedbackListFailure(error.message));

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

// ✅ Watcher
export function* watchUserFeedbackList() {
    yield takeLeading(USER_FEEDBACK_LIST_REQUEST, userFeedbackListSaga);
}
