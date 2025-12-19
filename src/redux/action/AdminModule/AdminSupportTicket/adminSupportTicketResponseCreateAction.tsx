// actions.js

import {
    SUPPORT_TICKET_RESPONSE_CREATE_CLEAR,
    SUPPORT_TICKET_RESPONSE_CREATE_FAILURE,
    SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
    SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionTypes';

export const fetchSupportTicketCreateResponseRequest = (payload: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
    payload: payload,
});

export const fetchSupportTicketCreateResponseSuccess = (data: string) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS,
    payload: data,
});

export const fetchSupportTicketCreateResponseFailure = (error: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_FAILURE,
    payload: error,
});

export const fetchSupportTicketCreateResponseClear = (data: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_CLEAR,
    payload: data,
});