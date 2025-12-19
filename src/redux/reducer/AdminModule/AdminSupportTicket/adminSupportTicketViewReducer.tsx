import {
  SUPPORT_TICKET_VIEW_CLEAR,
  SUPPORT_TICKET_VIEW_FAILURE,
  SUPPORT_TICKET_VIEW_REQUEST,
  SUPPORT_TICKET_VIEW_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";

const initialState = {
  supportTicketView: null,
  supportTicketViewLoading: false,
  error: null,
};

const supportTicketViewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_VIEW_REQUEST:
      return {
        ...state,
        supportTicketView: null,
        supportTicketViewLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_VIEW_SUCCESS:
      return {
        ...state,
        supportTicketView: action.payload,
        supportTicketViewLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_VIEW_FAILURE:
      return {
        ...state,
        supportTicketView: null,
        supportTicketViewLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_VIEW_CLEAR:
      return {
        supportTicketView: null,
        supportTicketViewLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketViewReducer;

