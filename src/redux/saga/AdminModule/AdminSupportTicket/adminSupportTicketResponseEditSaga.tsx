import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketEditResponseSuccess,
    fetchSupportTicketEditResponseFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditAction";
import { SUPPORT_TICKET_RESPONSE_EDIT_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditActionType";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketResponseEditSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        // payload must contain:
        // responseId, responseText

        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - EDIT SUPPORT TICKET RESPONSE
        const response = yield call(
            axios.put,
            `${AUTH.SUPPORT_TICKET_RESPONSE_EDIT}?responseId=${payload?.responseId}`,
            {
                responseText: payload?.responseText,
            },
            {
                headers: {
                    Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                    "User-id": user_id,
                },
            }
        );


        // ▶ Dispatch success
        yield put(fetchSupportTicketEditResponseSuccess(response?.data));

        showToast(
            "Support Ticket Response Updated Successfully",
            "success",
            "Support-Ticket-Response-Edit"
        );

    } catch (error: any) {
        // ▶ Dispatch failure
        yield put(fetchSupportTicketEditResponseFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        // ▶ Toast messages
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-Response-Edit");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-Response-Edit");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-Response-Edit"
            );
        }

    } finally {
        isPrevent = false;
    }
}

// ▶ Saga Watcher
export function* watchSupportTicketResponseEdit() {
    yield takeLeading(SUPPORT_TICKET_RESPONSE_EDIT_REQUEST, supportTicketResponseEditSaga);
}
