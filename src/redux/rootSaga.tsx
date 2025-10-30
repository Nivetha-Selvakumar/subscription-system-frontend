import { all } from "redux-saga/effects";

import { watchFetchData } from "./saga/LoginPage/LoginPageSaga";
import { watchUserCreate } from "./saga/SignUpPage/CreateUserSaga";

export default function* rootSaga() {
  yield all([  
    //Add other sagas here in future
    watchFetchData(),
    watchUserCreate(),

  ]);
}