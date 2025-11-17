import { call, put, takeLatest } from "redux-saga/effects";
import { AUTH } from "../../../endpoints/endpoints";
import axios from "axios";
import {
    fetchSubscriptionViewSuccess,
    fetchSubscriptionViewFailure,
} from "../../../action/UserModule/UserSubscription/userSubscriptionViewAction";
import { SUBSCRIPTION_VIEW_REQUEST } from "../../../actionTypes/UserModule/UserSubscription/userSubscriptionViewActionTypes";

let isPrevent = false;

function* userSubscriptionViewSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const { planId } = action.payload;
        const tokenVal = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        // ✅ Construct URL with query param
        const url = `${AUTH.SUBSCRIPTION_VIEW}?planId=${planId}`;

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
        yield put(fetchSubscriptionViewSuccess(data));

    } catch (error: any) {
        yield put(fetchSubscriptionViewFailure(error.message));
    } finally {
        isPrevent = false;
    }
}

// ✅ Watcher Saga
export function* watchUserSubscriptionView() {
    yield takeLatest(SUBSCRIPTION_VIEW_REQUEST, userSubscriptionViewSaga);
}
