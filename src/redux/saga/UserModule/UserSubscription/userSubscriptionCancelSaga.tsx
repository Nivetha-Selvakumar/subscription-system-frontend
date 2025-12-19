import { call, put, takeLatest } from 'redux-saga/effects';
import { SUBSCRIPTION_CANCEL_REQUEST } from '../../../actionTypes/UserModule/UserSubscription/userSubscriptionCancelActionTypes';
import { AUTH } from '../../../endpoints/endpoints';
import axios from 'axios';
import { fetchSubscriptionCancelSuccess, fetchSubscriptionCancelFailure } from '../../../action/UserModule/UserSubscription/userSubscriptionCancelAction';
import showToast from '../../../../common-components/ui/toastNotification';


// Prevent duplicate API hits
let isPrevent = false;
function* userSubscriptionCancelSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { planId, payload } = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id"); // assuming admin is logged in

        const url = `${AUTH.SUBSCRIPTION_CANCEL}?planId=${planId}`;

        // ✅ Correct axios signature: axios.post(url, data, config)
        const response = yield call(axios.put, url, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "Content-Type": "application/json",
                "User-Id": user_id,
            },
        });

        // ✅ Extract data
        const data = yield response.data;

        yield put(fetchSubscriptionCancelSuccess(data));
    } catch (error: any) {

        yield put(fetchSubscriptionCancelFailure(error.message));
        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Subscription-cancel");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Subscription-cancel");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Subscription-cancel"
            );
        }
    } finally {
        isPrevent = false;
    }
}

export function* watchSubscriptionCancel() {
    yield takeLatest(SUBSCRIPTION_CANCEL_REQUEST, userSubscriptionCancelSaga);
}
