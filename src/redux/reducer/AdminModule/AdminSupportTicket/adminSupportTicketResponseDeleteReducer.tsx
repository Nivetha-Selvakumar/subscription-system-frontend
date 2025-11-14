import {
  SUPPORT_TICKET_RESPONSE_DELETE_CLEAR,
  SUPPORT_TICKET_RESPONSE_DELETE_FAILURE,
  SUPPORT_TICKET_RESPONSE_DELETE_REQUEST,
  SUPPORT_TICKET_RESPONSE_DELETE_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseDeleteActionTypes";

const initialState = {
  supportTicketResponseDelete: null,
  supportTicketResponseDeleteLoading: false,
  error: null,
};

const supportTicketResponseDeleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_RESPONSE_DELETE_REQUEST:
      return {
        ...state,
        supportTicketResponseDelete: null,
        supportTicketResponseDeleteLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_DELETE_SUCCESS:
      return {
        ...state,
        supportTicketResponseDelete: action.payload,
        supportTicketResponseDeleteLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_DELETE_FAILURE:
      return {
        ...state,
        supportTicketResponseDelete: null,
        supportTicketResponseDeleteLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_RESPONSE_DELETE_CLEAR:
      return {
        supportTicketResponseDelete: null,
        supportTicketResponseDeleteLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketResponseDeleteReducer;

