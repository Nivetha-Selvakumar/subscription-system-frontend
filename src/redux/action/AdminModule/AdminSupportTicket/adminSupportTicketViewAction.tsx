// actions.js

import {
    SUPPORT_TICKET_VIEW_CLEAR,
    SUPPORT_TICKET_VIEW_FAILURE,
    SUPPORT_TICKET_VIEW_REQUEST,
    SUPPORT_TICKET_VIEW_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes';

export const fetchSupportTicketCreateRequest = (payload: any) => ({
    type: SUPPORT_TICKET_VIEW_REQUEST,
    payload: payload,
});

export const fetchSupportTicketCreateSuccess = (data: string) => ({
    type: SUPPORT_TICKET_VIEW_SUCCESS,
    payload: data,
});

export const fetchSupportTicketCreateFailure = (error: any) => ({
    type: SUPPORT_TICKET_VIEW_FAILURE,
    payload: error,
});

export const fetchSupportTicketCreateClear = (data: any) => ({
    type: SUPPORT_TICKET_VIEW_CLEAR,
    payload: data,
});