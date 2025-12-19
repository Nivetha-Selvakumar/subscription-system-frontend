import {
  SUPPORT_TICKET_EDIT_CLEAR,
  SUPPORT_TICKET_EDIT_FAILURE,
  SUPPORT_TICKET_EDIT_REQUEST,
  SUPPORT_TICKET_EDIT_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketEditActionTypes";

const initialState = {
  supportTicketEdit: null,
  supportTicketEditLoading: false,
  error: null,
};

const supportTicketEditReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_EDIT_REQUEST:
      return {
        ...state,
        supportTicketEdit: null,
        supportTicketEditLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_EDIT_SUCCESS:
      return {
        ...state,
        supportTicketEdit: action.payload,
        supportTicketEditLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_EDIT_FAILURE:
      return {
        ...state,
        supportTicketEdit: null,
        supportTicketEditLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_EDIT_CLEAR:
      return {
        supportTicketEdit: null,
        supportTicketEditLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketEditReducer;

