import {
  SUPPORT_TICKET_CREATE_CLEAR,
  SUPPORT_TICKET_CREATE_FAILURE,
  SUPPORT_TICKET_CREATE_REQUEST,
  SUPPORT_TICKET_CREATE_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketCreateActionTypes";

const initialState = {
  supportTicketCreate: null,
  supportTicketCreateLoading: false,
  error: null,
};

const supportTicketCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_CREATE_REQUEST:
      return {
        ...state,
        supportTicketCreate: null,
        supportTicketCreateLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_CREATE_SUCCESS:
      return {
        ...state,
        supportTicketCreate: action.payload,
        supportTicketCreateLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_CREATE_FAILURE:
      return {
        ...state,
        supportTicketCreate: null,
        supportTicketCreateLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_CREATE_CLEAR:
      return {
        supportTicketCreate: null,
        supportTicketCreateLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketCreateReducer;

