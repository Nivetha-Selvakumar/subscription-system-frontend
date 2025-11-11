import { call, put, takeEvery } from "redux-saga/effects";
import {
  PAYMENT_LIST_FAILURE,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminPayment/adminPaymentListActionTypes";
import { API_BASE_URL } from "../../../endpoints/endpoints";

function* paymentListSaga(action: any): Generator<any, void, any> {
  try {
    const { search, sort, filter, offset, limit } = action.payload || {};
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (filter) params.append("filter", filter);
    if (typeof offset === "number") params.append("offset", String(offset));
    if (typeof limit === "number") params.append("limit", String(limit));

    const response = yield call(
      fetch,
      `${API_BASE_URL}/payments${params.toString() ? `?${params.toString()}` : ""}`
    );
    const data = yield call([response, "json"]);

    if (response.ok) {
      yield put({ type: PAYMENT_LIST_SUCCESS, payload: data });
    } else {
      yield put({
        type: PAYMENT_LIST_FAILURE,
        payload: data?.message || "Failed to fetch payments",
      });
    }
  } catch (error: any) {
    yield put({
      type: PAYMENT_LIST_FAILURE,
      payload: error?.message || "An error occurred",
    });
  }
}

export default function* adminPaymentListSaga() {
  yield takeEvery(PAYMENT_LIST_REQUEST, paymentListSaga);
}

