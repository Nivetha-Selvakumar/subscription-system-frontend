const subscribe = process.env.REACT_APP_SUBSCRIBE;

export const AUTH = {
  LOGIN: `${subscribe}/login`,
  LOGOUT: `${subscribe}/logout`,
  SIGNUP: `${subscribe}/signup/user`,

  USER_LIST: `${subscribe}/get/users`,


  USER_CREATE: `${subscribe}/create/user`,
  USER_EDIT: `${subscribe}/edit/user`,
  USER_VIEW: `${subscribe}/get/userdetails`,
  USER_DELETE: `${subscribe}/delete/user`,


  PLAN_LIST: `${subscribe}/get/planList`,
  PLAN_CREATE: `${subscribe}/create/plan`,
  PLAN_EDIT: `${subscribe}/edit/plan`,
  PLAN_VIEW: `${subscribe}/get/planDetails`,
  PLAN_DELETE: `${subscribe}/delete/plan`,

  FEEDBACK_CREATE: `${subscribe}/create/feedback`,
  FEEDBACK_LIST: `${subscribe}/get/feedbackList`,
  FEEDBACK_EDIT: `${subscribe}/edit/feedback`,
  FEEDBACK_DELETE: `${subscribe}/delete/feedback`,
  FEEDBACK_VIEW: `${subscribe}/get/feedbackDetails`,
 
 
  SUPPORT_TICKET_CREATE: `${subscribe}/create/supportTicket`,
  SUPPORT_TICKET_RESPONSE_CREATE: `${subscribe}/create/supportTicketResponse`,
  SUPPORT_TICKET_VIEW: `${subscribe}/get/supportTicketDetails`,
  SUPPORT_TICKET_LIST: `${subscribe}/get/supportTicketList`,
  SUPPORT_TICKET_EDIT: `${subscribe}/edit/supportTicket`,
  SUPPORT_TICKET_RESPONSE_EDIT: `${subscribe}/edit/supportTicketResponse`,
  SUPPORT_TICKET_RESPONSE_DELETE: `${subscribe}/delete/supportTicketResponse`,


};

export const API_BASE_URL = subscribe;
