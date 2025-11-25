import {
  SUPPORT_TICKET_RESPONSE_CREATE_CLEAR,
  SUPPORT_TICKET_RESPONSE_CREATE_FAILURE,
  SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
  SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionTypes";

const initialState = {
  supportTicketResponseCreate: null,
  supportTicketResponseCreateLoading: false,
  error: null,
};

const supportTicketResponseCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_RESPONSE_CREATE_REQUEST:
      return {
        ...state,
        supportTicketResponseCreate: null,
        supportTicketResponseCreateLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_CREATE_SUCCESS:
      return {
        ...state,
        supportTicketResponseCreate: action.payload,
        supportTicketResponseCreateLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_CREATE_FAILURE:
      return {
        ...state,
        supportTicketResponseCreate: null,
        supportTicketResponseCreateLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_RESPONSE_CREATE_CLEAR:
      return {
        supportTicketResponseCreate: null,
        supportTicketResponseCreateLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketResponseCreateReducer;

