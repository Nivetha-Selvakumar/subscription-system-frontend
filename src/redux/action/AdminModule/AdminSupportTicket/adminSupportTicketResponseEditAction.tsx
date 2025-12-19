// actions.js

import {
    SUPPORT_TICKET_RESPONSE_EDIT_CLEAR,
    SUPPORT_TICKET_RESPONSE_EDIT_FAILURE,
    SUPPORT_TICKET_RESPONSE_EDIT_REQUEST,
    SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditActionType';

export const fetchSupportTicketEditResponseRequest = (payload: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_REQUEST,
    payload: payload,
});

export const fetchSupportTicketEditResponseSuccess = (data: string) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS,
    payload: data,
});

export const fetchSupportTicketEditResponseFailure = (error: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_FAILURE,
    payload: error,
});

export const fetchSupportTicketEditResponseClear = (data: any) => ({
    type: SUPPORT_TICKET_RESPONSE_EDIT_CLEAR,
    payload: data,
});