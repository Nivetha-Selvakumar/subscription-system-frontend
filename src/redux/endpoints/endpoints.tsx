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


};
