import {
  SUPPORT_TICKET_LIST_CLEAR,
  SUPPORT_TICKET_LIST_FAILURE,
  SUPPORT_TICKET_LIST_REQUEST,
  SUPPORT_TICKET_LIST_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketListActionTypes";

const initialState = {
  supportTicketList: null,
  supportTicketListLoading: false,
  error: null,
};

const supportTicketListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_LIST_REQUEST:
      return {
        ...state,
        supportTicketList: null,
        supportTicketListLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_LIST_SUCCESS:
      return {
        ...state,
        supportTicketList: action.payload,
        supportTicketListLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_LIST_FAILURE:
      return {
        ...state,
        supportTicketList: null,
        supportTicketListLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_LIST_CLEAR:
      return {
        supportTicketList: null,
        supportTicketListLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketListReducer;

