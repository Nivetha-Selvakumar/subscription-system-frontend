import {
  SUPPORT_TICKET_RESPONSE_EDIT_CLEAR,
  SUPPORT_TICKET_RESPONSE_EDIT_FAILURE,
  SUPPORT_TICKET_RESPONSE_EDIT_REQUEST,
  SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseEditActionType";

const initialState = {
  supportTicketResponseEdit: null,
  supportTicketResponseEditLoading: false,
  error: null,
};

const supportTicketResponseEditReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUPPORT_TICKET_RESPONSE_EDIT_REQUEST:
      return {
        ...state,
        supportTicketResponseEdit: null,
        supportTicketResponseEditLoading: true,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_EDIT_SUCCESS:
      return {
        ...state,
        supportTicketResponseEdit: action.payload,
        supportTicketResponseEditLoading: false,
        error: null,
      };
    case SUPPORT_TICKET_RESPONSE_EDIT_FAILURE:
      return {
        ...state,
        supportTicketResponseEdit: null,
        supportTicketResponseEditLoading: false,
        error: action.payload,
      };
    case SUPPORT_TICKET_RESPONSE_EDIT_CLEAR:
      return {
        supportTicketResponseEdit: null,
        supportTicketResponseEditLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default supportTicketResponseEditReducer;

