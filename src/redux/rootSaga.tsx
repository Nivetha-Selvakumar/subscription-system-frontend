import { all } from "redux-saga/effects";

import { watchFetchLoginData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/SignUpPage/CreateUserSaga";
import { watchLogoutSaga } from "./saga/Logout/LogoutSaga";
import { watchUserList } from "./saga/AdminModule/AdminUsers/adminUserListSaga";

export default function* rootSaga() {
  yield all([  
    //Add other sagas here in future
    watchFetchLoginData(),
    watchUserCreate(),
    watchLogoutSaga(),
    watchUserList(),

  ]);
}