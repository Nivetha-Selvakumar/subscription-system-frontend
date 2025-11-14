import { call, put, takeLeading } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSupportTicketCreateSuccess,
    fetchSupportTicketCreateFailure,
} from "../../../action/AdminModule/AdminSupportTicket/adminSupportTicketCreateAction";
import { SUPPORT_TICKET_CREATE_REQUEST } from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketCreateActionTypes";
import showToast from "../../../../common-components/ui/toastNotification";
import { AUTH } from "../../../endpoints/endpoints";

let isPrevent = false;

function* supportTicketCreateSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;
        const tokenVal = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        // ▶ API CALL - Support Ticket Create
        const response = yield call(axios.post, AUTH.SUPPORT_TICKET_CREATE, payload, {
            headers: {
                Authorization: tokenVal ? `Bearer ${tokenVal}` : "",
                "User-id": user_id,
            },
        });

        console.log("Support Ticket Create Response:", response);

        // Dispatch success
        yield put(fetchSupportTicketCreateSuccess(response?.data));

        // Show toast message
        // showToast("Support Ticket Created Successfully", "success", "Support-Ticket-Create");

    } catch (error: any) {
        // Dispatch failure
        yield put(fetchSupportTicketCreateFailure(error.message));

        const errorMessage = error?.response?.data?.Error;

        // ▶ Handle different error formats
        if (Array.isArray(errorMessage)) {
            showToast(errorMessage[0], "error", "Support-Ticket-Create");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            showToast(JSON.stringify(errorMessage), "error", "Support-Ticket-Create");
        } else {
            showToast(
                errorMessage || "An unexpected error occurred",
                "error",
                "Support-Ticket-Create"
            );
        }
    } finally {
        isPrevent = false;
    }
}

// ▶ Watcher
export function* watchSupportTicketCreate() {
    yield takeLeading(SUPPORT_TICKET_CREATE_REQUEST, supportTicketCreateSaga);
}
