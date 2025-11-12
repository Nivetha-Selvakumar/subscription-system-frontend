import { call, put, takeEvery } from "redux-saga/effects";
import {
  SUPPORT_TICKET_LIST_FAILURE,
  SUPPORT_TICKET_LIST_REQUEST,
  SUPPORT_TICKET_LIST_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketListActionTypes";
import { API_BASE_URL } from "../../../endpoints/endpoints";

function* supportTicketListSaga(action: any): Generator<any, void, any> {
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
      `${API_BASE_URL}/support-tickets${params.toString() ? `?${params.toString()}` : ""}`
    );
    const data = yield call([response, "json"]);

    if (response.ok) {
      yield put({ type: SUPPORT_TICKET_LIST_SUCCESS, payload: data });
    } else {
      yield put({
        type: SUPPORT_TICKET_LIST_FAILURE,
        payload: data?.message || "Failed to fetch support tickets",
      });
    }
  } catch (error: any) {
    yield put({
      type: SUPPORT_TICKET_LIST_FAILURE,
      payload: error?.message || "An error occurred",
    });
  }
}

export default function* adminSupportTicketListSaga() {
  yield takeEvery(SUPPORT_TICKET_LIST_REQUEST, supportTicketListSaga);
}

