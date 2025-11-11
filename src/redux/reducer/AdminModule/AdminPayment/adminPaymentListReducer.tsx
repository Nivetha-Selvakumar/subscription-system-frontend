import {
  PAYMENT_LIST_CLEAR,
  PAYMENT_LIST_FAILURE,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
} from "../../../actionTypes/AdminModule/AdminPayment/adminPaymentListActionTypes";

const initialState = {
  paymentList: null,
  paymentListLoading: false,
  error: null,
};

const paymentListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PAYMENT_LIST_REQUEST:
      return {
        ...state,
        paymentList: null,
        paymentListLoading: true,
        error: null,
      };
    case PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        paymentList: action.payload,
        paymentListLoading: false,
        error: null,
      };
    case PAYMENT_LIST_FAILURE:
      return {
        ...state,
        paymentList: null,
        paymentListLoading: false,
        error: action.payload,
      };
    case PAYMENT_LIST_CLEAR:
      return {
        paymentList: null,
        paymentListLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default paymentListReducer;

