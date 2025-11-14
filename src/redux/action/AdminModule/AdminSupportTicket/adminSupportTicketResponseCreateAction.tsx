// actions.js

import {
    SUPPORT_TICKET_RESPONSE_CREATE_CLEAR,
    SUPPORT_TICKET_RESPONSE_CREATE_FAILURE,
    SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
    SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionType';

export const fetchSupportTicketCreateRequest = (payload: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
    payload: payload,
});

export const fetchSupportTicketCreateSuccess = (data: string) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS,
    payload: data,
});

export const fetchSupportTicketCreateFailure = (error: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_FAILURE,
    payload: error,
});

export const fetchSupportTicketCreateClear = (data: any) => ({
    type: SUPPORT_TICKET_RESPONSE_CREATE_CLEAR,
    payload: data,
});