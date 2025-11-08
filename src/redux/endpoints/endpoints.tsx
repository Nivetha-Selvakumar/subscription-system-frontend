const subscribe = process.env.REACT_APP_SUBSCRIBE;

export const AUTH = {
  LOGIN: `${subscribe}/login`,
  LOGOUT: `${subscribe}/logout`,
  SIGNUP: `${subscribe}/create/user`,

  USER_LIST : `${subscribe}/get/users`,


};
