import { all } from "redux-saga/effects";

import { watchFetchLoginData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/AdminModule/AdminUsers/adminCreateUserSaga";
import { watchLogoutSaga } from "./saga/Logout/LogoutSaga";
import { watchUserList } from "./saga/AdminModule/AdminUsers/adminUserListSaga";
import { watchSignupUser } from "./saga/SignUpPage/signUpUserSaga";
import { watchUserEdit } from "./saga/AdminModule/AdminUsers/adminEditUserSaga";
import { watchUserDelete } from "./saga/AdminModule/AdminUsers/adminDeleteUserSaga";
import { watchUserView } from "./saga/AdminModule/AdminUsers/adminViewUserSaga";

export default function* rootSaga() {
  yield all([  
    //Add other sagas here in future
    watchFetchLoginData(),
    watchLogoutSaga(),
    watchSignupUser(),
    watchUserList(),
    watchUserCreate(),
    watchUserEdit(),
    watchUserView(),
    watchUserDelete(),

  ]);
}