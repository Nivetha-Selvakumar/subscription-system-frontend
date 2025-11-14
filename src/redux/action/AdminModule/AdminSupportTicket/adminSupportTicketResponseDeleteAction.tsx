// actions.js

import {
    SUPPORT_TICKET_RESPONSE_DELETE_CLEAR,
    SUPPORT_TICKET_RESPONSE_DELETE_FAILURE,
    SUPPORT_TICKET_RESPONSE_DELETE_REQUEST,
    SUPPORT_TICKET_RESPONSE_DELETE_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteActionTypes';

export const fetchSupportTicketDeleteRequest = (payload: any) => ({
    type: SUPPORT_TICKET_RESPONSE_DELETE_REQUEST,
    payload: payload,
});

export const fetchSupportTicketDeleteSuccess = (data: string) => ({
    type: SUPPORT_TICKET_RESPONSE_DELETE_SUCCESS,
    payload: data,
});

export const fetchSupportTicketDeleteFailure = (error: any) => ({
    type: SUPPORT_TICKET_RESPONSE_DELETE_FAILURE,
    payload: error,
});

export const fetchSupportTicketDeleteClear = (data: any) => ({
    type: SUPPORT_TICKET_RESPONSE_DELETE_CLEAR,
    payload: data,
});