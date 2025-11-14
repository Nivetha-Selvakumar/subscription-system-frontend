// actions.js

import {
    SUPPORT_TICKET_RESPONSE_EDIT_CLEAR,
    SUPPORT_TICKET_RESPONSE_EDIT_FAILURE,
    SUPPORT_TICKET_RESPONSE_EDIT_REQUEST,
    SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditActionType';

export const fetchSupportTicketCreateRequest = (payload: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_REQUEST,
    payload: payload,
});

export const fetchSupportTicketCreateSuccess = (data: string) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS,
    payload: data,
});

export const fetchSupportTicketCreateFailure = (error: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_FAILURE,
    payload: error,
});

export const fetchSupportTicketCreateClear = (data: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_CLEAR,
    payload: data,
});