// actions.js

import {
    SUPPORT_TICKET_EDIT_CLEAR,
    SUPPORT_TICKET_EDIT_FAILURE,
    SUPPORT_TICKET_EDIT_REQUEST,
    SUPPORT_TICKET_EDIT_SUCCESS,
} from '../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketEditActionTypes';

export const fetchSupportTicketEditRequest = (payload: any) => ({
    type: SUPPORT_TICKET_EDIT_REQUEST,
    payload: payload,
});

export const fetchSupportTicketEditSuccess = (data: string) => ({
    type: SUPPORT_TICKET_EDIT_SUCCESS,
    payload: data,
});

export const fetchSupportTicketEditFailure = (error: any) => ({
    type: SUPPORT_TICKET_EDIT_FAILURE,
    payload: error,
});

export const fetchSupportTicketEditClear = (data: any) => ({
    type: SUPPORT_TICKET_EDIT_CLEAR,
    payload: data,
});