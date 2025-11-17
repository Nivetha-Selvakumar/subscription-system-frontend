import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketDeleteSuccess,
    fetchSupportTicketDeleteFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteAction";
import { SUPPORT_TICKET_RESPONSE_DELETE_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketResponseDeleteSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload; 
        // payload must contain → { responseId }

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - DELETE TICKET RESPONSE
        const response = yield call(
            axios.delete,
            `${AUTH.SUPPORT_TICKET_RESPONSE_DELETE}?responseId=${payload?.responseId}`,
            {
                headers: {
                    Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                    "User-id": user_id,
                },
            }
        );

        // ▶ Success
        yield put(fetchSupportTicketDeleteSuccess(response?.data));

        showToast(
            "Support Ticket Response Deleted Successfully",
            "success",
            "Support-Ticket-Response-Delete"
        );

    } catch (error: any) {

        yield put(fetchSupportTicketDeleteFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        // ▶ Error Toast
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-Response-Delete");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-Response-Delete");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-Response-Delete"
            );
        }

    } finally {
        isPrevent = false;
    }
}

// ▶ Watcher
export function* watchSupportTicketResponseDelete() {
    yield takeLeading(SUPPORT_TICKET_RESPONSE_DELETE_REQUEST, supportTicketResponseDeleteSaga);
}
