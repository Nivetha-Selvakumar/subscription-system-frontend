// actions.js

import {
    SUPPORT_TICKET_VIEW_CLEAR,
    SUPPORT_TICKET_VIEW_FAILURE,
    SUPPORT_TICKET_VIEW_REQUEST,
    SUPPORT_TICKET_VIEW_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes';

export const fetchSupportTicketViewRequest = (payload: any) => ({
    type: SUPPORT_TICKET_VIEW_REQUEST,
    payload: payload,
});

export const fetchSupportTicketViewSuccess = (data: string) => ({
    type: SUPPORT_TICKET_VIEW_SUCCESS,
    payload: data,
});

export const fetchSupportTicketViewFailure = (error: any) => ({
    type: SUPPORT_TICKET_VIEW_FAILURE,
    payload: error,
});

export const fetchSupportTicketViewClear = (data: any) => ({
    type: SUPPORT_TICKET_VIEW_CLEAR,
    payload: data,
});