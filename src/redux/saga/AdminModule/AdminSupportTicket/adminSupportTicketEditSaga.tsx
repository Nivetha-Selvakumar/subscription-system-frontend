import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketEditSuccess,
    fetchSupportTicketEditFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketEditAction";
import { SUPPORT_TICKET_EDIT_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketEditActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload; // { targetTicketId, issueDescription }
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL — Edit Ticket
        const response = yield call(
            axios.put,
            `${AUTH.SUPPORT_TICKET_EDIT}?targetTicketId=${payload?.targetTicketId}`,
            payload?.body, // IssueDescription, status, ticketStatus
            {
                headers: {
                    Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                    "User-id": user_id,
                },
            }
        );

        console.log("Support Ticket Edit Response:", response);

        // ▶ Success Dispatch
        yield put(fetchSupportTicketEditSuccess(response?.data));

        showToast("Support Ticket Updated Successfully", "success", "Support-Ticket-Edit");

    } catch (error: any) {
        // ▶ Failure Dispatch
        yield put(fetchSupportTicketEditFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        // ▶ Error Toast
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-Edit"
            );
        }
    } finally {
        isPrevent = false;
    }
}

// ▶ Watcher
export function* watchSupportTicketEdit() {
    yield takeLeading(SUPPORT_TICKET_EDIT_REQUEST, supportTicketEditSaga);
}
