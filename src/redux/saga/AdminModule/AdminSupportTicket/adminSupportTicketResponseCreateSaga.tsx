import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketCreateSuccess,
    fetchSupportTicketCreateFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateAction";
import { SUPPORT_TICKET_RESPONSE_CREATE_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionType";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketResponseCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload; 
        // payload must contain: { targetTicketId, body(responseText) }

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - CREATE TICKET RESPONSE
        const response = yield call(
            axios.post,
            `${AUTH.SUPPORT_TICKET_RESPONSE_CREATE}?targetTicketId=${payload?.targetTicketId}`,
            payload?.body,  // request body contains: { responseText }
            {
                headers: {
                    Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                    "User-id": user_id,
                },
            }
        );

        console.log("Support Ticket Response Create:", response);

        // ▶ Success Dispatch
        yield put(fetchSupportTicketCreateSuccess(response?.data));

        showToast(
            "Support Ticket Response Created Successfully",
            "success",
            "Support-Ticket-Response-Create"
        );

    } catch (error: any) {

        // ▶ Failure Dispatch
        yield put(fetchSupportTicketCreateFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-Response-Create");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-Response-Create");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-Response-Create"
            );
        }

    } finally {
        isPrevent = false;
    }
}

// ▶ Watcher
export function* watchSupportTicketResponseCreate() {
    yield takeLeading(SUPPORT_TICKET_RESPONSE_CREATE_REQUEST, supportTicketResponseCreateSaga);
}
