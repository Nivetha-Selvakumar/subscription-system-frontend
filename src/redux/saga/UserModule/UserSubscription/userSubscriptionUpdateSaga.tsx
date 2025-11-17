import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import showToast from "../../../../common-components/ui/toastNotification";
import {
    fetchSubscriptionUpdateFailure,
    fetchSubscriptionUpdateSuccess,
} from "../../../action/UserModule/UserSubscription/userSubscriptionUpdateAction";
import { SUBSCRIPTION_UPDATE_REQUEST } from "../../../actionTypes/UserModule/UserSubscription/userSubscriptionUpdateActionTypes";

let isPrevent = false;

function* userSubscriptionEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;
        const userId = localStorage.getItem("user_id"); // assuming admin is logged in

        const { planId, payload } = action.payload;
        const tokenVal = localStorage.getItem("token");

        // ✅ Build correct URL with query parameter
        const url = `${AUTH.SUBSCRIPTION_UPDATE}?planId=${planId}`;

        // ✅ Axios PUT request with headers
        const response = yield call(axios.put, url, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": userId, // matches backend header
            },
        });

        const data = response.data;

        // ✅ Dispatch success
        yield put(fetchSubscriptionUpdateSuccess(data));
        showToast("Subscription Updated successfully", "success", "Subscription-Edit");
    } catch (error: any) {
        // ✅ Dispatch failure
        yield put(fetchSubscriptionUpdateFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Subscription-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Subscription-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Subscription-Edit"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchSubscriptionEdit() {
    yield takeLatest(SUBSCRIPTION_UPDATE_REQUEST, userSubscriptionEditSaga);
}
