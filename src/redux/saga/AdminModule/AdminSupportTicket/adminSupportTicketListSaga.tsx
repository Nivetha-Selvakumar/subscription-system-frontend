import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketListSuccess,
    fetchSupportTicketListFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketListAction";
import { SUPPORT_TICKET_LIST_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketListActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketListSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - GET Support Ticket List
        const response = yield call(axios.get, AUTH.SUPPORT_TICKET_LIST, {
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

        console.log("Support Ticket List Response:", response);

        // SUCCESS DISPATCH
        yield put(fetchSupportTicketListSuccess(response?.data));

    } catch (error: any) {

        yield put(fetchSupportTicketListFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        // ▶ Toaster handling
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-List");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-List");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-List"
            );
        }

    } finally {
        isPrevent = false;
    }
}

// ▶ Watcher
export function* watchSupportTicketList() {
    yield takeLeading(SUPPORT_TICKET_LIST_REQUEST, supportTicketListSaga);
}
