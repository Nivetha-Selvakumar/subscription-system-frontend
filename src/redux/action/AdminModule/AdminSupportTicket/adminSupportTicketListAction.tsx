// actions.js

import {
    SUPPORT_TICKET_LIST_CLEAR,
    SUPPORT_TICKET_LIST_FAILURE,
    SUPPORT_TICKET_LIST_REQUEST,
    SUPPORT_TICKET_LIST_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketListActionTypes';

export const fetchSupportTicketListRequest = (payload: any) => ({
    type: SUPPORT_TICKET_LIST_REQUEST,
    payload: payload,
});

export const fetchSupportTicketListSuccess = (data: string) => ({
    type: SUPPORT_TICKET_LIST_SUCCESS,
    payload: data,
});

export const fetchSupportTicketListFailure = (error: any) => ({
    type: SUPPORT_TICKET_LIST_FAILURE,
    payload: error,
});

export const fetchSupportTicketListClear = (data: any) => ({
    type: SUPPORT_TICKET_LIST_CLEAR,
    payload: data,
});