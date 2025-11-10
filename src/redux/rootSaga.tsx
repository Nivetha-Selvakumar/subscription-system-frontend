import { all } from "redux-saga/effects";

import { watchFetchLoginData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/AdminModule/AdminUsers/adminCreateUserSaga";
import { watchLogoutSaga } from "./saga/Logout/LogoutSaga";
import { watchUserList } from "./saga/AdminModule/AdminUsers/adminUserListSaga";
import { watchSignupUser } from "./saga/SignUpPage/signUpUserSaga";

export default function* rootSaga() {
  yield all([  
    //Add other sagas here in future
    watchFetchLoginData(),
    watchLogoutSaga(),
    watchSignupUser(),
    watchUserList(),
    watchUserCreate(),

  ]);
}