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
  PLAN_DELETE: `${subscribe}/delete/plan  `,


};

export const API_BASE_URL = subscribe;
