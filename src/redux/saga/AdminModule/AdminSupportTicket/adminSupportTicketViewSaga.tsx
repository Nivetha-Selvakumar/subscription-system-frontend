import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketViewSuccess,
    fetchSupportTicketViewFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketViewAction";
import { SUPPORT_TICKET_VIEW_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketViewSaga(action: any): Generator<any, void, any> {

    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - VIEW SUPPORT TICKET DETAILS
        const response = yield call(
            axios.get,
            `${AUTH.SUPPORT_TICKET_VIEW}`,
            {
                params: {
                    targetTicketId: payload?.targetTicketId,
                },
                headers: {
                    Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                    "User-id": user_id,
                },
            }
        );


        // ▶ Dispatch Success
        yield put(fetchSupportTicketViewSuccess(response?.data));

    } catch (error: any) {
        // ▶ Dispatch Failure
        yield put(fetchSupportTicketViewFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-View");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-View");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-View"
            );
        }

    } finally {
        isPrevent = false;
    }
}

// ▶ Saga Watcher
export function* watchSupportTicketView() {
    yield takeLeading(SUPPORT_TICKET_VIEW_REQUEST, supportTicketViewSaga);
}
